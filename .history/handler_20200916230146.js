'use strict';
const request = require('request');

module.exports.getOrderStatus = async event => {
  const orderID = event.currentIntent.slots["Pedido"];

  //This API information should be put somewhere safe
  //And probably hit the Auth API to get proper tokens
  const options = {
    method: 'GET',
    url: `https://hiringcoders15.vtexcommercestable.com.br/api/oms/pvt/orders/${orderID}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-vtex-api-appkey': 'vtexappkey-hiringcoders15-RCHJLW',
      'x-vtex-api-apptoken': 'SOVMIRVBGNODAILKBAOGZBFXPUBFIKSCIEQZGVDBWEIIGVUITSKZHOGRJXWOQQSVVMVWRLEFXNKVSXRUZTMQZSUUYZQIZOLGLMNUAYRHOFBTDKYMGBOXDCVCRAYRVVGI',
      vtexidclientautcookie: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjBEN0REN0UzMUMzRTI4MkEwNEI0M0VGNUY5MDQ5ODZCMUY3RUM3RjYiLCJ0eXAiOiJqd3QifQ'
    }
  };
  
  const data;

  try {
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
    data = body;
  });

    return {
      "sessionAttributes": {},
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": data.statusDescription
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
