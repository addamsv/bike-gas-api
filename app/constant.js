"use strict";

const ENV = {
    IS_TEST_MODE: true,
    USERS_COLLECTION_NAME: "Users",
    EMAIL: "swares@mail.ru",
    BASIC_OAUTH: PropertiesService?.getScriptProperties()?.getProperty("BASIC_OAUTH"),
    SECRET_KEY: PropertiesService?.getScriptProperties()?.getProperty("SECRET_KEY")
}

const HttpStatus = {
    OK: 200,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
}

if (typeof module !== 'undefined') { module.exports = { ENV, HttpStatus }; }

