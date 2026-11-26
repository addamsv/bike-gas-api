
function findByOrderId_test() {
  const res = doPOST(
    {
      parameter: {
        endpoint: "orders",
        action: "findByOrderId",
        method: "POST"
      },
      postData: {
        contents: JSON.stringify({
          authorization: ENV.BASIC_OAUTH,
          orderID: 213127,
        })
      }
    }
  );

  return LoggerHelper(res);
}

function orderFindById_test() {
  const res = doPOST({
    parameter: {
      endpoint: "orders",
      action: "orderFindById",
      method: "POST"
    },
    postData: {
      contents: JSON.stringify(
        {
          authorization: ENV.BASIC_OAUTH,
          ID: 15
        }
      )
    }
  });

  return LoggerHelper(res);
}


function orderCreate_test() {
  const data = JSON.stringify({
    userID: "1",
    status: "pending",
    orderID: "1",
    order_time: "11-11-26",
    total_price: "20",
    total: "1",
    description: "shimano",
    ex: "1",
    user: JSON.stringify({
      "id": 1,
      "firstname": 2,
      "secondname": 20,
      "email": 20,
      "phone": "aaa"
    }),
    items: JSON.stringify([
      {
        "productId": 1,
        "amount": 2,
        "price": 20,
        "desc": "aaa"
      },
      {
        "productId": 2,
        "amount": 1,
        "price": 20,
        "desc": "sfsdf"
      }
    ]),
  });

  const res = doPOST({
    parameter: { endpoint: "orders", action: "create", method: "POST" },
    postData: {
      contents: JSON.stringify({
        authorization: ENV.BASIC_OAUTH,
        data
      })
    }
  });

  return LoggerHelper(res);
}