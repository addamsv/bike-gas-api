"use strict";

if (typeof require !== 'undefined') {
    // var { ENV } = require('../app/constant');
    Object.assign(global, require('../app/constant'));
}

function sendEmail(header, body) {
    MailApp.sendEmail(ENV.EMAIL, header || "From MyGglAPI", body || "No BODY");
}

if (typeof module !== 'undefined') {
    module.exports = {
        sendEmail
    };
}
