const { _getPathData } = require('../../index');

describe('_getPathData Endpoint tests', () => {
  test("req.pathInfo = 'api/v1/users' ➔ { endpoints: ['api', 'v1'], lastPart: 'users' }", () => {
    const routs = _getPathData({
      pathInfo: 'api/v1/users'
    });

    expect(Array.isArray(routs)).toBe(true);
    expect(routs[0]).toBe('api');
    expect(routs[1]).toBe('v1');
    expect(routs[2]).toBe('users');
  });
  test("req.pathInfo = \"users\" ➔ { endpoints: [], lastPart: 'users' }", () => {
    const routs = _getPathData({
      pathInfo: 'users'
    });

    expect(Array.isArray(routs)).toBe(true);
    // expect(routs).toEqual([]); // .toHaveLength(0);
    expect(routs[0]).toBe('users');
  });
  test("req.pathInfo = undefined ➔ { endpoints: [], lastPart: '' }", () => {
    const routs = _getPathData({
      pathInfo: undefined
    });

    expect(Array.isArray(routs)).toBe(true);
    expect(routs).toEqual([]); // .toHaveLength(0);
  });
});