"use strict";

if (typeof require !== 'undefined') {
    // const { ENV } = require('../app/constant');
    Object.assign(global,
        require('../app/constant'),
        // const { getUUID } = require('../utils/UUID');
        require('../utils/UUID')
    );
}

const create = (item = {}, collectionName = "") => {
    let response;
    const lock = _LOCK();

    try {
        lock.waitLock(30000);
        const sheet = _getSheet(collectionName);
        const data = _getData(collectionName, sheet);

        const lastRow = sheet.getLastRow();
        const headerArr = data[0];
        const newID = getUUID();
        const element = {};

        const rowValues = headerArr.map((headerName) => {
            if (headerName === "id") {
                element.id = newID;
                return newID;
            }

            element[headerName] = item[headerName] !== undefined ? item[headerName] : "";
            return element[headerName];
        });

        sheet
            .getRange(lastRow + 1, 1, 1, rowValues.length)
            .setValues([rowValues]);

        _FLUSH();

        response = {
            collectionName,
            status: "successfully created",
            retData: element,
        };
    } catch (err) {
        response = {
            collectionName,
            status: "fail",
            message: err.message,
            retData: null,
        };
    } finally {
        _UNLOCK(lock);
    }

    return response;
};

const deleteById = (id, collectionName) => {
    let response;
    const lock = _LOCK();

    try {
        lock.waitLock(30000);

        const sheet = _getSheet(collectionName);
        const data = _getData(collectionName, sheet);

        const element = { data: {} };

        const isSuccess = data.some((row, indx) => {
            if (row[0] == id) {
                element.data = row;

                sheet.deleteRow(indx + 1);

                return true;
            }
        });

        _FLUSH();

        response = {
            collectionName, status: "success", retData: element.data
        };
    } catch (err) {
        response = {
            status: "fail",
            message: err.message
        };
    } finally {
        _UNLOCK(lock);
    }

    return response;
};

const updateById = (id, collectionName, item = {}) => {
    let response;

    const lock = _LOCK();

    try {
        lock.waitLock(30000);

        const sheet = _getSheet(collectionName);
        const data = _getData(collectionName, sheet);

        const headerArr = data[0];

        const element = {};

        const rowIndex = data.findIndex((row, indx) => indx > 0 && row[0] == id);

        if (rowIndex === -1) {
            throw new Error('not find');
        }

        const updatedRow = headerArr.map((headerName, headerIndx) => {

            element[headerName] = item[headerName] || data[rowIndex][headerIndx];

            return item[headerName] || data[rowIndex][headerIndx];

        });

        sheet
            .getRange(rowIndex + 1, 1, 1, updatedRow.length)
            .setValues([updatedRow]);

        _FLUSH();

        response = { collectionName, status: "success", retData: element };
    } catch (err) {
        response = {
            status: "fail",
            message: err.message
        };
    } finally {
        _UNLOCK(lock);
    }

    return response;
};

const findById = (id, collectionName, isAuthRequired = false) => {
    const sheet = _getSheet(collectionName);
    const data = _getData(collectionName, sheet);
    const headerArr = data[0];

    const element = { data: {} };
    const isSuccess = data.some((row, indx) => {
        if (row[0] == id) {

            const resultObj = headerArr.reduce((acc, headerName, indx) => {
                if (headerName === "user_pass") {
                    return acc;
                }

                acc[headerName] = row[indx.toString()];

                return acc;
            }, {});

            element.data = resultObj;

            return true;
        }
    });

    return { collectionName, status: isSuccess ? "success" : "fail", retData: element.data };
};

const findAll = (collectionName = "", isAuthRequired = false) => {
    try {
        if (isAuthRequired) {
            isAuth();
        }

        const [headerArr, ...rows] = _getData(collectionName);

        if (!headerArr) {
            return { collectionName, status: "fail", retData: [], message: "there is no headers" };
        }

        const retData = rows.map((el) => {
            const object = {};

            headerArr.forEach((headerName, indx) => {
                if (headerName !== "user_pass") {
                    object[headerName] = el[indx];
                }
            });

            return object;
        });

        return { collectionName, status: retData ? "success" : "fail", retData };
    } catch (e) {
        throw new Error(e.message);
    }

};

const getByHeaderName = (value, headerName, collectionName, isAuthRequired = false) => {
    const data = _getData(collectionName);
    const headerArr = data[0];

    const headerIndex = headerArr.indexOf(headerName);

    if (headerIndex === -1) {
        throw new Error("headers do not contain name: " + headerName);
    }

    const element = { data: {} };

    const isSuccess = data.some((row, indx) => {
        if (row[headerIndex] == value) {

            const sourceObj = { ...row };

            // Превращаем в новый объект с правильными именами
            const resultObj = Object.keys(sourceObj).reduce((acc, currentKey) => {
                // Находим новое имя по индексу (currentKey — это строка '0', '1', превращаем в число)

                const newKeyName = headerArr[Number(currentKey)];

                if (newKeyName) {
                    acc[newKeyName] = sourceObj[currentKey];
                }
                else {
                    // На случай, если в объекте индексов больше, чем элементов в массиве имен
                    acc[currentKey] = sourceObj[currentKey];
                }

                return acc;
            }, {});


            const { user_pass: pass, ...sanitized } = resultObj;

            element.data = sanitized;

            return true;
        }
    });

    return { collectionName, status: isSuccess ? "success" : "fail", retData: element.data };
};

const getAllByHeaderName = (value, headerName, collectionName, isAuthRequired = false) => {
    const [headers, ...rows] = _getData(collectionName);
    const headerIndex = headers?.indexOf(headerName) ?? -1;

    if (headerIndex === -1) {
        throw new Error(`headers do not contain name: ${headerName}`);
    }

    const retData = rows.reduce((acc, row) => {
        if (row[headerIndex] == value) {
            const item = {};

            row.forEach((cell, idx) => {
                const key = headers[idx] || idx;
                if (key !== 'user_pass') {
                    item[key] = cell;
                }
            });

            acc.push(item);
        }
        return acc;
    }, []);

    return { collectionName, status: 'success', retData };
};


/*
*           GAS DEPENDENCY
*/

// max 30 000 ms
function _LOCK() {
    return LockService.getScriptLock();
}

function _FLUSH() {
    SpreadsheetApp
        .flush();
}

function _UNLOCK(lock) {
    lock.releaseLock();
}

function _getSheet(collectionName) {
    return SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName(collectionName);
}

/**
 * 
 * @param {*} collectionName 
 * @param {*} sheet 
 * @returns {Array.<Array.<*>>}
 */
function _getData(collectionName, sheet = null) {
    const targetSheet = sheet || _getSheet(collectionName);

    if (!targetSheet) {
        throw new Error(`there is no any "${collectionName}"`);
    }

    return targetSheet
        .getDataRange()
        .getValues();
}

function getUsers(sheet = null) {
    const [headerArr, ...rows] = _getData(ENV.USERS_COLLECTION_NAME, sheet);

    if (!headerArr) {
        throw new Error(`getUsers: headerArr === undef || []`);
    }

    return rows.map((el) => {
        const user = {};

        headerArr.forEach((headerName, indx) => {
            user[headerName] = el[indx];
        });

        return user;
    });
}


if (typeof module !== 'undefined') {
    module.exports = {
        getUsers,
        getByHeaderName,
        getAllByHeaderName,
        findAll,
        findById,
        updateById,
        deleteById,
        create
    };
}

