/** 
 * At the moment shipping information is mocked ¯\_(ツ)_/¯
 * **/

const get = (country) => {
  let shippingInfo = {};

  switch (country) {
    case 'DE':
      shippingInfo.freeLimit = 30;
      shippingInfo.cost = 3.90;
      break;
    default:
      shippingInfo.freeLimit = 89;
      shippingInfo.cost = 8.90;
  }

  return shippingInfo;
}

module.exports = {
  get,
}