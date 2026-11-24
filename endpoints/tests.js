"use strict";

function testGetController(acction, req) {
    return {
        params: req?.parameters,
        test: findAll('Test')
    };
}

function testPostController(acction, req) {
    return {
        params: req,
        // test: findById(id, 'Test')
    };
}
