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
      pathInfo: "api/v1/users",
      // parameter: { endpoint: "users", action: "create", method: "POST" },
      parameter: { action: "create" },
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