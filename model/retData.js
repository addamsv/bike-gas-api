"use strict";

function _json(jsonObj) {
  const stringObj = JSON.stringify(jsonObj);

  return ContentService
    .createTextOutput(stringObj)
    .setMimeType(ContentService.MimeType.JSON);
}

function ok(data = {}, message = "") {
  const res = {
      isSuccess: true,
      statusCode: HttpStatus.OK,
      message,
      ...data
  };

  return _json(res);
}

function err(statusCode = HttpStatus.UNAUTHORIZED, message = "forbidden", data = {}) {
    const res = {
        isSuccess: false,
        statusCode,
        message,
        data
    };

    return _json(res);
}
