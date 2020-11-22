require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth, default: shopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');
const Shopify = require('shopify-api-node');
const serve = require('koa-static');
const bodyParser = require('koa-body');

const db = require('./server/database.handler');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
} = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(serve('public'));
  server.use(bodyParser());

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products', 'write_shipping' ],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        console.log(shop, accessToken)
      }
    })
  );

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

  router.post('/webhooks/products/create', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook);
  });
  
  router.get('/public-config', async (ctx) => {

    // TODO: shop query
    const shop = 'shipping-hackathon.myshopify.com';

    if (typeof shop !== "undefined") {
      const config = db.getConfig(shop);
      ctx.body = { success: true, config }
    } else {
      ctx.body = { success: false }
    }
  });

  router.get('/config', verifyRequest(), async (ctx) => {
    const { shop } = ctx.session;

    if (typeof shop !== "undefined") {
      const config = db.getConfig(shop);
      ctx.body = { success: true, config }
    } else {
      ctx.body = { success: false }
    }
  });

  router.put('/config', verifyRequest(), async (ctx) => {
    const body = ctx.request.body;

    const { shop } = ctx.session;

    if (typeof body !== "undefined" && typeof body.config !== "undefined" && typeof shop !== "undefined") {
      db.saveConfig(shop, body.config);
      ctx.body = { success: true }
    } else {
      ctx.body = { success: false }
    }
  });

  server.use(graphQLProxy({ version: ApiVersion.July20 }));

  router.get('(.*)', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
