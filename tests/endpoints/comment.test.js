const { doPOST, doGET } = require('../../index');
const { ENV } = require('../../app/constant');

describe('Comments Endpoint tests', () => {
  test("create", () => {
    const data = JSON.stringify(
      {
        "id": 11,
        "product_id": "1001",
        "iat": "27.5.2025 15:2",
        "owner": "2",
        "text": "Waw"
      }
    );

    const res = doPOST({
      // parameter: {
      // endpoint: "comments",
      // action: "create",
      // _method: "POST"
      // },
      parameter: {
        rout: "api/v1/comments",
        action: "create"
      },
      postData: {
        contents: JSON.stringify({
          authorization: ENV.BASIC_OAUTH,
          data
        })
      }
    });

    expect(res.collectionName).toBe('Comments');
    expect(res.status).toBe('successfully created');

    // isObject
    expect(typeof res.retData).toBe('object');
    expect(res.retData).not.toBeNull();
    expect(Array.isArray(res.retData)).toBe(false);

    expect(res.retData).toMatchObject({ owner: "2" });
    expect(res.retData).toMatchObject({ product_id: "1001" });
    expect(res.retData).toMatchObject({ text: 'Waw' });

  });
  test("read", () => {
    const res = doGET({
      parameter: {
        endpoint: "comments",
        // action: "findCommentByProductId",
        // _method: "GET",
        id: "1001"
      }
    });

    expect(res.collectionName).toBe('Comments');
    expect(res.status).toBe('success');

    // isArray
    expect(Array.isArray(res.retData)).toBe(true);

    // isObject
    expect(typeof res.retData[0]).toBe('object');
    expect(res.retData[0]).not.toBeNull();
    expect(Array.isArray(res.retData[0])).toBe(false);

    expect(res.retData[0]).toMatchObject({ owner: "1" });
    expect(res.retData[0]).toMatchObject({ product_id: "1001" });
    expect(res.retData[0]).toMatchObject({ text: 'super-proper' });

  });
  test("read", () => {
    const res = doGET({
      parameter: {
        rout: "api/v1/comments/1001",
        // action: "findCommentByProductId",
        // _method: "GET",
        // id: "1001"
      }
    });

    expect(res.collectionName).toBe('Comments');
    expect(res.status).toBe('success');

    // isArray
    expect(Array.isArray(res.retData)).toBe(true);

    // isObject
    expect(typeof res.retData[0]).toBe('object');
    expect(res.retData[0]).not.toBeNull();
    expect(Array.isArray(res.retData[0])).toBe(false);

    expect(res.retData[0]).toMatchObject({ owner: "1" });
    expect(res.retData[0]).toMatchObject({ product_id: "1001" });
    expect(res.retData[0]).toMatchObject({ text: 'super-proper' });

  });
  test("update", () => {
  });
  test("delete", () => {
  });
});