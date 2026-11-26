const { doPOST } = require('../../index');
const { ENV } = require('../../app/constant');

describe('Comments Endpoint tests', () => {
  test("create", () => {
    const data = JSON.stringify(
      {
        "id": 11,
        "product_id": 1001,
        "iat": "27.5.2025 15:2",
        "owner": 2,
        "text": "Waw"
      }
    );

    const res = doPOST({
      pathInfo: "api/v1/comments",
      // parameter: {
      // endpoint: "comments",
      // action: "create",
      // method: "POST"
      // },
      parameter: { action: "create" },
      postData: {
        contents: JSON.stringify({
          authorization: ENV.BASIC_OAUTH,
          data
        })
      }
    });

  });
  test("read", () => {
  });
  test("update", () => {
  });
  test("delete", () => {
  });
});