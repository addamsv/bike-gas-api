/*
 *      GET
 */
// function findCommentByProductId_test() {
//   const res = doGET({
//     parameter: {
//       endpoint: "comments",
//       action: "findCommentByProductId",
//       method: "GET",
//       id: "1001"
//       // product_id: "1001"
//     }
//   });

//   return LoggerHelper(res);
// }

/*
 *     POST
 */
// function commentCreate_test() {
//   const data = JSON.stringify(
//     {
//       "id": 11,
//       "product_id": 1001,
//       "iat": "27.5.2025 15:2",
//       "owner": 2,
//       "text": "Waw"
//     }
//   );

//   const res = doPOST({
//     parameter: { endpoint: "comments", action: "create", method: "POST" },
//     postData: {
//       contents: JSON.stringify({
//         authorization: ENV.BASIC_OAUTH,
//         data
//       })
//     }
//   });

//   return LoggerHelper(res);
// }
