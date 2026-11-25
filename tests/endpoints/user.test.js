const { doPOST } = require('../../index');
const { ENV } = require('../../app/constant');

describe('User Endpoint tests', () => {
  test("create", () => {
    const data = JSON.stringify({
      "user_name": "Michael",
      "user_pass": "aaa",
      // "user_role": "admin",
      "user_email": "a@a.a",
      // "iat": "",
      "roles": "admin",
      "enabled": false,
      "name": "scott",
      "phone": "29-333-33-33"
    });

    const res = doPOST({
      parameter: { endpoint: "user", action: "create", method: "POST" },
      postData: {
        contents: JSON.stringify({
          authorization: ENV.BASIC_OAUTH,
          data
        })
      }
    })

    console.log(res)
  });
  test("read", () => {
  });
  test("update", () => {
  });
  test("delete", () => {
  });
});