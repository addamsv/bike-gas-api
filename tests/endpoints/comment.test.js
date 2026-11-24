const { doPOST } = require('../../index');
const { ENV } = require('../../app/constant');

describe('Comments Endpoint tests', () => {
  test("create", () => {
    const data = JSON.stringify(
      {
        "id": 11,
        "bookId": 1001,
        "iat": "27.5.2025 15:2",
        "owner": 2,
        "text": "Waw"
      }
    );

    const res = doPOST({
      parameter: { endpoint: "comment", action: "create", method: "POST" },
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