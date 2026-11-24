"use strict";

// https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/HttpStatus.html
// https://stackoverflow.com/questions/7561550/list-of-spring-runtime-exceptions
// UsernameNotFoundException("user with username " + username + " not found")
// HttpClientErrorException(HttpStatus.BAD_REQUEST, "Device with ID " + id + " not found")
// new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST)
//export const E_USER_EMAIL_TAKEN = "This email is already taken!";
//export const E_USER_NOT_FOUND = "User not found!";
//export const E_USER_ALREADY_EXISTS = "User already exists!";
//export const E_INCORRECT_EMAIL_OR_PASSWORD = "Email or password entered is incorrect!";
//export const E_PASSWORD_INCORRECT = "The password entered is incorrect!";
//export const E_TOO_MANY_REQUESTS = "Too many requests!";
//export const E_TRANSACTION_NOT_FOUND = "User not found! Please make sure the transaction ID entered is valid!";
//exp

class RetError extends Error {
    constructor(statusCode, ...params) {
        super(...params);

        Object.setPrototypeOf(this, RetError.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RetError);
        }

        this.name = "RetError";

        this.statusCode = statusCode;

        // this.aditional = aditional;
        this.date = new Date();
    }
}

class ValidationException extends Error {
    constructor(...params) {
        super(...params);

        Object.setPrototypeOf(this, ValidationException.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationException);
        }

        this.name = "RetError";

        this.statusCode = HttpStatus.BAD_REQUEST;

        // this.aditional = aditional;
        this.date = new Date();
    }
}

class AuthException extends Error {
    constructor(...params) {
        super(...params);

        Object.setPrototypeOf(this, AuthException.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthException);
        }

        this.name = "RetError";

        this.statusCode = HttpStatus.FORBIDDEN;

        // this.aditional = aditional;
        this.date = new Date();
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        RetError,
        AuthException,
        ValidationException
    };
}