"use strict";

if (typeof require !== 'undefined') {
    Object.assign(global,
        // const { ENV, HttpStatus } = require('../app/constant');
        require('../app/constant'),
        // const { getUsers } = require('../model/persist');
        require('../model/persist')
    );
}

/**
 * Converts a byte array to a hexadecimal string.
 * @param {Byte[]} data The byte array.
 * @return {string} The hexadecimal string.
 */
function bytesToHex(data) {
    return data.map(function (byte) {
        const v = (byte < 0) ? 256 + byte : byte; // Convert from 2's complement if negative
        return ("0" + v.toString(16)).slice(-2); // Convert byte to hexadecimal and ensure it's two digits
    }).join("");
}

/**
 * Calculates HMAC-SHA256 signature and encodes it in Hex.
 *
 * @param {string} value The data to sign (message).
 * @param {string} key The secret key to use.
 * @return {string} The Hex encoded signature.
 */
function getHmacSignatureHex(value, key) {
    const hash = Utilities.computeHmacSha256Signature(value, key);
    return bytesToHex(hash); // hex;
}

/**
 * Decodes a Base64 encoded string to its original string format in Google Apps Script.
 * @param {string} encodedString The Base64 encoded string.
 * @return {string} The decoded string.
 */
function atobEquivalent(encodedString) {
    const byteArray = Utilities.base64Decode(encodedString); // Decode the Base64 string into a byte array

    // Convert the byte array into a string
    // For standard text (like UTF-8), you can use newBlob() and getDataAsString()
    return Utilities.newBlob(byteArray).getDataAsString(); // decoded String;
}

function btoaEquivalent(str) {
    // Convert the string to a byte array using UTF-8 encoding
    const bytes = Utilities.newBlob(str).getBytes();

    // Encode the byte array to a Base64 string
    return Utilities.base64Encode(bytes); // base64Encoded;
}

// const _decodeBase64 = (data) => Buffer.from(data, "base64").toString("ascii");
const _getIat = Math.round((new Date().getTime() / 1000));

// in seconds from now:
// (new Date().getTime() + seconds * 1000)/1000
// 1 hour from now:
const _getExp = Math.round((new Date().getTime() + 60 * 60 * 1000) / 1000);

const _basicAuthFilter = (data, sheet) => {
    try {
        const decode = atobEquivalent(data);

        const [username, password] = decode.split(":");

        if (!username || !password) {
            throw new Error(`no username or password`);
        }

        const users = getUsers(sheet);

        const candidate = users.find((user) => {
            if (user.user_name == username
                && getHmacSignatureHex(password, ENV.SECRET_KEY) == user.user_pass // signatureHex,
            ) {
                return true;
            }
        });

        if (candidate) {
            const { userPass: pass, ...returnUserData } = candidate;

            return returnUserData;
        }

        throw new Error(`no candidate`);
    }
    catch (e) {
        throw new Error(`err _basicAuthFilter: ${e instanceof Error ? e.message : ""}`);
    }
};

/**          JWT
 * SHA-256 hash function reference implementation.
 *
 * This is an annotated direct implementation of FIPS 180-4, without any optimisations. It is
 * intended to aid understanding of the algorithm rather than for production use.
 *
 * While it could be used where performance is not critical, I would recommend using the ‘Web
 * Cryptography API’ (developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) for the browser,
 * or the ‘crypto’ library (nodejs.org/api/crypto.html#crypto_class_hash) in Node.js.
 *
 * See csrc.nist.gov/groups/ST/toolkit/secure_hashing.html
 *     csrc.nist.gov/groups/ST/toolkit/examples.html
 */
const _parseJwt = (token) => {
    try {
        const tokenParts = token.split(".");

        const payloadClaims = JSON.parse(atobEquivalent(tokenParts[1]));

        if (payloadClaims.exp < _getIat
            && !ENV.IS_TEST_MODE) {
            throw new Error(`token expired`);
        }

        const data = `${tokenParts[0]}.${tokenParts[1]}`;

        const signatureHex = getHmacSignatureHex(data, ENV.SECRET_KEY);

        if (signatureHex == tokenParts[2]) {
            return payloadClaims;
        }

        throw new Error(`signature is corrupted`);
    }
    catch (e) {
        throw new Error(`err _parseJwt: ${e instanceof Error ? e.message : ""}`);
    }
};

const _authFilterByToken = (data, sheet) => {
    try {
        const decode = _parseJwt(data);

        const users = getUsers(sheet);

        const candidate = users.find((user) => user.user_name == decode?.sub);

        if (candidate) {
            const { userPass: pass, ...returnUserData } = candidate;

            return returnUserData;
        }

        throw new Error(`there is no any candidate`);
    }
    catch (e) {
        throw new Error(`err _authFilterByToken: ${e instanceof Error ? e.message : ""}`);
    }
};

const _getAuthData = (req) => {
    try {
        if (!req?.postData?.contents) {
            throw new Error(`no body in request`);
        }

        const body = JSON.parse(req.postData.contents);

        if (!body?.authorization) {
            throw new Error(`no body.authorization in request`);
        }

        const [type = "", authorizationData = ""] = body.authorization.split(" ");

        switch (type) {
            case "Basic":
                return [type, authorizationData];
            case "Bearer":
                return [type, authorizationData];
            default:
                throw new Error(`no Basic or Bearer auth`);
        }
    }
    catch (e) {
        throw new Error(`err _getAuthData: ${e instanceof Error ? e.message : ""}`);
    }
};

/**
 *
 *   PUBLIC METHODS
 *
 *
 */
const getCustomJWT = (sub, sheet = null) => {
    try {
        // const sub = {
        //   header: { alg: "RS256" },
        //   claims:{
        //     iss: "self",
        //     sub, // "admin" // user name
        //     exp, // 1732827822
        //     iat, // 1732820622
        //     authorities, // "ROLE_ADMIN"
        //   }
        // };

        if (!sub) {
            throw new Error("no userName");
        }

        const users = getUsers(sheet);

        const candidate = users.find((user) => user.user_name === sub);

        if (!candidate) {
            throw new Error("User Not found");
        }

        const jwtHeader = { alg: "RS256" };

        const authorities = `[${candidate.user_role}]` || '[]'; // candidate.userRole || 

        const iat = _getIat;

        const exp = _getExp;

        const claims = {
            iss: "self",
            sub, // "admin" // user name
            exp, // 1732827822
            iat, // 1732820622
            authorities, // "ROLE_ADMIN"
        };

        const data = `${btoaEquivalent(JSON.stringify(jwtHeader))}.${btoaEquivalent(JSON.stringify(claims))}`;

        // https://nodejs.org/api/crypto.html#crypto_class_hash
        const signatureHex = getHmacSignatureHex(data, ENV.SECRET_KEY);

        return `${data}.${signatureHex}`;
    }
    catch (e) {
        throw new Error(`err getCustomJWT: ${e instanceof Error ? e.message : ""}`);
    }
};

const isAuth = (req, sheet = null) => {
    try {
        const [type, authData] = _getAuthData(req);

        if (type === "Bearer") {
            return { isSuccess: true, code: HttpStatus.OK, ..._authFilterByToken(authData, sheet) };
        }

        if (type === "Basic") {
            return { isSuccess: true, code: HttpStatus.OK, ..._basicAuthFilter(authData, sheet) };
        }
    }
    catch (e) {
        throw new Error(`FORBIDDEN: ${e instanceof Error ? e.message : "unknown error"}`);
    }
};

if (typeof module !== 'undefined') {
    module.exports = {
        atobEquivalent,
        getHmacSignatureHex,
        btoaEquivalent,
        _parseJwt,
        getCustomJWT,
        isAuth
    };
}
