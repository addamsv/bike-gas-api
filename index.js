if (typeof require !== 'undefined') {
    var { productPostController } = require('./endpoints/products');
    var { commentPostController } = require('./endpoints/comment');
}

"use strict";

/*
 *   GET POST PUT DELETE METHODS
 */

function doGET(req) {
    const { endpoint = '', action = "findAll" } = req?.parameter || {};

    switch (endpoint) {
        case "user": { return userGetController(action, req); }
        case "comment": { return commentGetController(action, req); }
        case "product": { return productGetController(action, req); }
        case "food": { return foodGetController(action, req); }
        default: { throw new Error("There is no GET endpoint: " + endpoint); }
    }
}

function doPOST(req) {
    const { endpoint = '', action = 'findAll', method = "POST" } = req?.parameter || {};

    switch (endpoint) {
        case "user": { return userPostController(action, req); }
        case "order": { return orderPostController(action, req); }
        case "profile": { return profilePostController(action, req); }
        case "comment": { return commentPostController(action, req); }
        case "product": { return productPostController(action, req); }
        default: { throw new Error("There is no POST endpoint: " + endpoint); }
    }
}

function doPUT(req) {
    const { endpoint = '', action = "updateById", id = "" } = req?.parameter || {};

    switch (endpoint) {
        default: { throw new Error("There is no PUT endpoint: " + endpoint); }
    }
}

function doDELETE(req) {
    const { endpoint = '', action = "deleteById", id = "" } = req?.parameter || {};

    switch (endpoint) {
        default: { throw new Error("There is no DELETE endpoint: " + endpoint); }
    }
}


/*
 *    NATIVE GET & POST METHODS
 */

function doGet(req) {
    try { return ok(doGET(req)); }
    catch (e) { return err(e instanceof RetError ? e.statusCode : 401, e.message || "something goes wrong... "); }
}

function doPost(req) {
    try {
        if (req?.parameter?.method === 'PUT') { return ok(doPUT(req)); }

        if (req?.parameter?.method === 'DELETE') { return ok(doDELETE(req)); }

        // req?.parameter?.method === 'POST'
        return ok(doPOST(req));
    }
    catch (e) {
        return err(e instanceof RetError ? e.statusCode : 401, e.message || "something goes wrong... ");
    }
}


if (typeof module !== 'undefined') {
    module.exports = {
        doPOST,
        doGET,
        doPUT,
        doDELETE,
    };
}
