const { getReqData } = require('../../index');

describe('getReqData Endpoint tests', () => {
  test("req.parameter.rout = 'api/v1/users' ➔ rout = {collection: 'users'}", () => {
    const rout = getReqData({
      parameter: {
        rout: 'api/v1/users'
      }
    });

    // expect(Array.isArray(rout)).toBe(true);
    expect(typeof rout).toBe('object');
    expect(rout).not.toBeNull();
    expect(Array.isArray(rout)).toBe(false);

    expect(rout).toMatchObject({ collection: "users" });
    expect(rout).toMatchObject({ id: undefined });
    expect(rout).toMatchObject({ action: undefined });
    // expect(rout[0]).toBe('api');
    // expect(rout[1]).toBe('v1');
    // expect(rout[2]).toBe('users');
  });
  test("req.parameter.rout = 'api/v1/users/321112' ➔ rout = {collection: 'users', id: '321112'}", () => {
    const rout = getReqData({
      parameter: {
        rout: 'api/v1/users/321112',
        action: 'findById'
      }
    });

    // expect(Array.isArray(rout)).toBe(true);
    expect(typeof rout).toBe('object');
    expect(rout).not.toBeNull();
    expect(Array.isArray(rout)).toBe(false);

    expect(rout).toMatchObject({ collection: "users" });
    expect(rout).toMatchObject({ id: '321112' });
    expect(rout).toMatchObject({ action: 'findById' });
    // expect(rout[0]).toBe('api');
    // expect(rout[1]).toBe('v1');
    // expect(rout[2]).toBe('users');
  });
  test("req.parameter.rout = 'api/v1/users/321112' ➔ rout = {collection: 'users', id: '321112'}", () => {
    const rout = getReqData({
      parameter: {
        rout: 'api/v1/users/321112'
      },
      postData: {
        contents: JSON.stringify({
          action: 'findById'
        })
      }
    });

    // expect(Array.isArray(rout)).toBe(true);
    expect(typeof rout).toBe('object');
    expect(rout).not.toBeNull();
    expect(Array.isArray(rout)).toBe(false);

    expect(rout).toMatchObject({ collection: "users" });
    expect(rout).toMatchObject({ id: '321112' });
    expect(rout).toMatchObject({ action: 'findById' });
    // expect(rout[0]).toBe('api');
    // expect(rout[1]).toBe('v1');
    // expect(rout[2]).toBe('users');
  });
  test("req.parameter.endpoint = \"users\" ➔ rout = {collection: 'users'}", () => {
    const rout = getReqData({
      parameter: {
        endpoint: 'users'
      }
    });

    expect(typeof rout).toBe('object');
    expect(rout).not.toBeNull();
    expect(Array.isArray(rout)).toBe(false);

    expect(rout).toMatchObject({ collection: "users" });
    expect(rout).toMatchObject({ id: undefined });
    expect(rout).toMatchObject({ action: undefined });
  });
  test("req.parameter.rout = undefined ➔ rout: {}", () => {
    const rout = getReqData({
      parameter: {}
    });

    expect(typeof rout).toBe('object');
    expect(rout).not.toBeNull();
    expect(Array.isArray(rout)).toBe(false);

    expect(rout).toMatchObject({ collection: undefined });
    expect(rout).toMatchObject({ id: undefined });
    expect(rout).toMatchObject({ action: undefined });
  });
});