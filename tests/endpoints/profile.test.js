const { doPOST } = require('../../index');
const { ENV } = require('../../app/constant');

describe('Profile Endpoint tests', () => {
  test("create", () => {
    const data = JSON.stringify({
      "id": 2,
      "owner": 2,
      "firstname": "Michael",
      "lastname": "Last",
      "age": 50,
      "country": "Russia",
      "city": "Novosibirsk",
      "address": "Gorky 288-555",
      "image": "/images/img3.jpg",
      "currency": "RUB",
      "phone": "375-29-103-97-17"
    });

    const res = doPOST({
      // parameter: { endpoint: "profiles", action: "create", method: "POST" },
      parameter: {
        rout: "api/v1/profiles",
        action: "create"
      },
      postData: {
        contents: JSON.stringify({
          authorization: ENV.BASIC_OAUTH,
          data
        })
      }
    })

  });
  test("read", () => {
  });
  test("update", () => {
  });
  test("delete", () => {
  });
});