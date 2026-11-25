const { doPOST } = require('../../index');
const { ENV } = require('../../app/constant');

describe('Order Endpoint tests', () => {
  test("create", () => {
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
      parameter: { endpoint: "order", action: "create", method: "POST" },
      postData: {
        contents: JSON.stringify({
          authorization: ENV.BASIC_OAUTH,
          data
        })
      }
    });

    console.log(res)
  });
  test("read", () => {
  });
  test("update", () => {
  });
  test("delete", () => {
  });
});