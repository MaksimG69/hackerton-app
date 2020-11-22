const { getJSON } = require('js-cookie');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config("configs", true, true, '/'));

const getConfig = (shop) => {
  return db.getData(`/${shop}`);
}

const saveConfig = (shop, config) => {
  return db.push(`/${shop}`, config);
}

module.exports = {
  getConfig,
  saveConfig,
}