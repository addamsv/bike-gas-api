const {
  atobEquivalent,
  btoaEquivalent,
  getHmacSignatureHex,
  _parseJwt,
  getCustomJWT,
  isAuth
} = require('../../services/auth');

const { ENV } = require('../../app/constant');

describe('Encode Decode TEST ', () => {
  test("atobEquivalent 'SGVsbG8gV29ybGQ=' should be 'Hello World'", () => {
    const result = atobEquivalent('SGVsbG8gV29ybGQ=');
    expect(result).toBe('Hello World');
  });

  test("btoaEquivalent 'U2VyZ2V5OjEyMw==': base64 should be  'Sergey:123'", () => {
    const result = btoaEquivalent('Sergey:123');
    expect(result).toBe('U2VyZ2V5OjEyMw==');
  });

  test("getHmacSignatureHex 'message' should be  '05b24d3f65e294a8890259f6a77f1b6d5fcb8ab8bc4dbb1d07a90145796e773a'", () => {
    const message = "message";
    const key = ENV.SECRET_KEY;
    const result = getHmacSignatureHex(message, key);
    expect(result).toBe('b861dbe225c8ae0c7131ef5a94ac6bf88e8bc3190fe22e7b0e541440b791f1a7');
  });

  test("getHmacSignatureHex '12345' should be  '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e'", () => {
    const message = "12345";
    const key = ENV.SECRET_KEY;
    const result = getHmacSignatureHex(message, key);
    expect(result).toBe('99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e');
  });

  test("_parseJwt", () => {
    const result = _parseJwt("eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiU2VyZ2V5IiwiZXhwIjoxNzk1MjYxODY1LCJpYXQiOjE3OTUyNTgyNjUsImF1dGhvcml0aWVzIjoiW21vZGVyYXRvcl0ifQ==.4f4ef8da0b869a67cab5e529d0c979df4bf56368fe87c2f9653bd8d9edff5a61");
    // {
    //   iss: 'self',
    //   sub: 'Sergey',
    //   exp: ~1747558813,
    //   iat: ~1747555213,
    //   authorities: '[moderator]'
    // }
    expect(result.iss).toBe('self');
    expect(result.sub).toBe('Sergey');
    expect(result.authorities).toBe('[moderator]');
  });

  test("getCustomJWT", () => {
    const result = getCustomJWT("Sergey");

    const claims = _parseJwt(result);
    expect(claims.iss).toBe('self');
    expect(claims.sub).toBe('Sergey');
    expect(claims.authorities).toBe('[moderator]');
  });

  test("isAuth Bearer", () => {
    const result = isAuth(
      {
        postData: {
          contents: JSON.stringify({
            // you can get the token from above tests
            authorization: "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiU2VyZ2V5IiwiZXhwIjoxNzk1MjYxODY1LCJpYXQiOjE3OTUyNTgyNjUsImF1dGhvcml0aWVzIjoiW21vZGVyYXRvcl0ifQ==.4f4ef8da0b869a67cab5e529d0c979df4bf56368fe87c2f9653bd8d9edff5a61"
          })
        }
      }
    );

    // {
    //   isSuccess: true,
    //   code: 200,
    //   id: 1,
    //   user_name: 'Sergey',
    //   user_pass: '12345',
    //   user_role: 'moderator'
    // }

    expect(result.isSuccess).toBe(true);
    expect(result.code).toBe(200);
    expect(result.user_name).toBe('Sergey');
    expect(result.user_role).toBe('moderator');
  });

  test("isAuth Basic", () => {
    const result = isAuth(
      {
        postData: {
          contents: JSON.stringify({
            authorization: ENV.BASIC_OAUTH
          })
        }
      }
    );

    expect(result.isSuccess).toBe(true);
    expect(result.code).toBe(200);
    expect(result.user_name).toBe('Sergey');
    expect(result.user_role).toBe('moderator');
  });

});



