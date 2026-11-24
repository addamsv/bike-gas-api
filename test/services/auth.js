// TESTS:

function testAtobEquivalent() {
  const res = atobEquivalent('SGVsbG8gV29ybGQ=');

  Logger.log(res); // 'SGVsbG8gV29ybGQ=': base64 -> 'Hello World': string

  return LoggerHelper(res);
}

function testBtoaEquivalent() {
  // 'U2VyZ2V5OjEyMw==': base64 -> 'Sergey:123'
  Logger.log(btoaEquivalent("Sergey:123"));  // 'Hello World': string -> 'SGVsbG8gV29ybGQ=': base64
}

function testHmacHexExample() {
  const message = "message";

  const signatureHex = getHmacSignatureHex(message, ENV.SECRET_KEY);

  const res = "Message: " + message + " Key: " + ENV.SECRET_KEY + " HMAC-SHA256 Signature (Hex): " + signatureHex;

  Logger.log(res);

  return res;
}

function testParseJwt() {
  const decode = _parseJwt("eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3NDc1NTg4MTMsImlhdCI6MTc0NzU1NTIxMywiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOIn0=.991b4db01922388e3faeed030375880d8155b9874f8224137323ea1eae3c4214");

  const decode2 = _parseJwt("eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiU2VyZ2V5IiwiZXhwIjoxNzczNTc5MzU5LCJpYXQiOjE3NzM1NzU3NTksImF1dGhvcml0aWVzIjoibW9kZXJhdG9yIn0=.328aae5d67e4c378b51e20e4477781077627bf3071bce680a35a9c2015c7f920");

  Logger.log("JWT1: " + JSON.stringify(decode) + ";  JWT2: " + JSON.stringify(decode2));
}

function testGetCustomJWT() {
  const jwt = getCustomJWT("Sergey");

  return LoggerHelper("JWT: " + jwt);
}

function testIsAuth() {
  try {
    const isOkByToken = isAuth({ postData: { contents: JSON.stringify({ authorization: "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiU2VyZ2V5IiwiZXhwIjoxNzczNTc5MzU5LCJpYXQiOjE3NzM1NzU3NTksImF1dGhvcml0aWVzIjoibW9kZXJhdG9yIn0=.328aae5d67e4c378b51e20e4477781077627bf3071bce680a35a9c2015c7f920" }) } });

    const isOkByBasic = isAuth({ postData: { contents: JSON.stringify({ authorization: "Basic U2VyZ2V5OjEyMw==" }) } });

    return LoggerHelper({ isOkByToken, isOkByBasic });
  } catch (e) {
    return LoggerHelper({ statusCode: e.message });
  }
}

function testCustomRetError() {
  try {
    throw new RetError(401, 'access denied');
  } catch (e) {
    Logger.log(e.statusCode);

    Logger.log(e.message);

    Logger.log(e.name);

    Logger.log(e.date);
  }
}

function testHmacHexPass() {
  const pass = "123";

  const signatureHex = getHmacSignatureHex(pass, ENV.SECRET_KEY);

  Logger.log("pass: " + pass);

  Logger.log("Key: " + ENV.SECRET_KEY);

  Logger.log("HMAC-SHA256 Signature (Hex): " + signatureHex);
}

function testAuthAll() {
  testAtobEquivalent();

  testBtoaEquivalent();

  testHmacHexExample();

  testParseJwt();

  testGetCustomJWT();

  testIsAuth();

  testCustomRetError();

  testHmacHexPass();
}
