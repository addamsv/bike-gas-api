"use strict";

/*
 *   GET POST PUT DELETE METHODS
 */

function doGET(req) {
    const routs = _getPathData(req);

    let route = (routs[0] === "api" && routs[1] === "v1" && routs[2]) ? routs[2] : "";

    console.log("route: " + route)

    const { endpoint = route, action } = req?.parameter || {};
    switch (endpoint) {
        case "users": { return userGetController(action, req); }
        case "comments": { return commentGetController(action, req); }
        case "products": { return productGetController(action, req); }
        case "profiles": { return profileGetController(action, req); }
        case "orders": { return orderGetController(action, req); }
        case "foods": { return foodGetController(action, req); }
        default: { throw new Error("There is no GET route: " + endpoint); }
    }
}

function doPOST(req) {
    const routs = _getPathData(req);

    let route = (routs[0] === "api" && routs[1] === "v1" && routs[2]) ? routs[2] : "";

    console.log("route: " + route)

    const { endpoint = route, action } = req?.parameter || {};

    switch (endpoint) {
        case "users": { return userPostController(action, req); }
        case "orders": { return orderPostController(action, req); }
        case "profiles": { return profilePostController(action, req); }
        case "comments": { return commentPostController(action, req); }
        case "products": { return productPostController(action, req); }
        default: { throw new Error("There is no POST route: " + endpoint); }
    }
}

function doPUT(req) {
    const routs = _getPathData(req);

    let route = (routs[0] === "api" && routs[1] === "v1" && routs[2]) ? routs[2] : "";

    console.log("route: " + route)

    const { endpoint = route, action } = req?.parameter || {};

    switch (endpoint) {
        default: { throw new Error("There is no PUT route: " + endpoint); }
    }
}

function doDELETE(req) {
    const routs = _getPathData(req);

    let route = (routs[0] === "api" && routs[1] === "v1" && routs[2]) ? routs[2] : "";

    console.log("route: " + route)

    const { endpoint = route, action } = req?.parameter || {};

    switch (endpoint) {
        default: { throw new Error("There is no DELETE route: " + endpoint); }
    }
}

function _getPathData(req) {
    const path = req?.pathInfo || "";
    const routs = path.split("/").filter(Boolean);
    // const routs = segments.slice(0, -1);

    return routs;
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
        if (req?.parameter?._method === 'PUT') { return ok(doPUT(req)); }
        if (req?.parameter?._method === 'DELETE') { return ok(doDELETE(req)); }

        return ok(doPOST(req));
    }
    catch (e) { return err(e instanceof RetError ? e.statusCode : 401, e.message || "something goes wrong... "); }
}


if (typeof module !== 'undefined') {
    module.exports = {
        doPOST,
        doGET,
        doPUT,
        doDELETE,
        _getPathData
    };
}
