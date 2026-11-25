"use strict";

function testGetController(action, req) {
    return {
        params: req?.parameters,
        test: findAll('Test')
    };
}

function testPostController(action, req) {
    return {
        params: req,
        // test: findById(id, 'Test')
    };
}
