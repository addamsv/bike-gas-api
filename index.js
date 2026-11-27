"use strict";

/*
 *   GET POST PUT DELETE METHODS
 */

function doGET(req) {
    const rout = getReqData(req);

    switch (rout.collection) {
        case "comments": { return commentGetController(rout); }
        case "foods": { return foodGetController(rout.action, req); }
        case "orders": { return orderGetController(rout.action, req); }
        case "products": { return productGetController(rout.action, req); }
        case "profiles": { return profileGetController(rout.action, req); }
        case "users": { return userGetController(rout.action, req); }
        default: { throw new Error("There is no GET route: " + endpoint); }
    }
}

function doPOST(req) {
    const rout = getReqData(req);

    switch (rout.collection) {
        case "users": { return userPostController(rout.action, req); }
        case "orders": { return orderPostController(rout.action, req); }
        case "profiles": { return profilePostController(rout.action, req); }
        case "comments": { return commentPostController(rout.action, req); }
        case "products": { return productPostController(rout.action, req); }
        default: { throw new Error("There is no POST route: " + endpoint); }
    }
}

function doPUT(req) {
    switch (endpoint) {
        default: { throw new Error("There is no PUT route: " + endpoint); }
    }
}

function doDELETE(req) {
    switch (endpoint) {
        default: { throw new Error("There is no DELETE route: " + endpoint); }
    }
}

function getReqData(req) {
    const params = req?.parameter || {};
    const path = params.rout || "";
    const routes = path.split("/").filter(Boolean);

    const isApiV1 = routes[0] === "api" && routes[1] === "v1";

    let action = params.action;
    if (!action && req?.postData?.contents) {
        try {
            ({ action } = JSON.parse(req.postData.contents));
        } catch { }
    }

    return {
        collection: (isApiV1 && routes[2]) || params.endpoint,
        id: (isApiV1 && routes[3]) || params.id,
        action,
    };
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
        getReqData
    };
}
