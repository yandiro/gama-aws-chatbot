'use strict';
const axios = require("axios");

module.exports.getOrderStatus = async (event) => {
  const orderID = event.currentIntent.slots["Pedido"];
  const url = `https://hiringcoders15.vtexcommercestable.com.br/api/oms/pvt/orders/${orderID}`;


  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-vtex-api-appkey': `${process.env.vtexAppKey}`,
      'x-vtex-api-apptoken': `${process.env.vtexApiToken}`,
      vtexidclientautcookie: `${process.env.vtexIdClient}`
    }
  };

  try {
    const response = await axios.get(url, options);
    const data = response.data;

    return {
      "sessionAttributes": {},
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": `O status do seu pedido de número ${orderID} é "${data.statusDescription}" e está sendo enviado para o endereço ${data.shippingData.address.addressType} em nome de ${data.shippingData.address.receiverName}`
        }
      }
    }
  } catch (error) {
    console.log(error);
    return {
      "sessionAttributes": {},
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": 'Pedido não encontrado.'
        }
      }
    }
  }
};