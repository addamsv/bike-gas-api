/*
 *       POST
 */

function favoriteCreate_test() {
  const data = JSON.stringify(
    {
      "id": 11,
      "owner": 2,
      "product_id": 1001,
      "created_at": "27.5.2025 15:2"
    }
  );

  const res = doPOST({
    parameter: { endpoint: "favorite", action: "create", method: "POST" },
    postData: {
      contents: JSON.stringify({
        authorization: ENV.BASIC_OAUTH,
        data
      })
    }
  });

  return LoggerHelper(res);
}
