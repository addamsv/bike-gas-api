"use strict";

const crypto = require('crypto');

// should be before require constant
const mockProperties = {
  BASIC_OAUTH: 'Basic U2VyZ2V5OjEyMzQ1',
  SECRET_KEY: 'L16ASVwsStHbN1V44K0f7xM4vJb3lvC3rrHGRCloTOASVD3f',
};

global.PropertiesService = {
  getScriptProperties: jest.fn(() => ({
    getProperty: jest.fn((key) => mockProperties[key] || null),
    setProperty: jest.fn((key, val) => { mockProperties[key] = val; }),
    setProperties: jest.fn((obj) => Object.assign(mockProperties, obj))
  }))
};

Object.assign(global,
  require('../app/constant'), // const { ENV, HttpStatus }
  require('../app/exceptions'), // const { RetError }

  require('../services/auth'), // const { isAuth }
  require('../services/mail'), // const { sendEmail }
  require('../model/persist'), // const { findAll, findById, create, deleteById, updateById }

  // { PostController, GetController } 
  require('../endpoints/comment'),
  require('../endpoints/order'),
  require('../endpoints/products'),
  require('../endpoints/profile'),
  require('../endpoints/user'),
);

const toBuffer = (input) => {
  if (Array.isArray(input)) {
    return Buffer.from(new Int8Array(input));
  }
  return Buffer.from(String(input), 'utf8');
};

const toGasBytes = (buf) => {
  return Array.from(new Int8Array(buf.buffer, buf.byteOffset, buf.byteLength));
};


global.Utilities = {
  getUuid: jest.fn(() => 'mocked-uuid-1234'),
  formatDate: jest.fn(() => '2026-11-17'),

  newBlob: jest.fn((data) => {
    const buf = toBuffer(data);
    return {
      getBytes: jest.fn(() => toGasBytes(buf)),
      getDataAsString: jest.fn(() => buf.toString('utf8'))
    };
  }),

  computeHmacSha256Signature: jest.fn((value, key) => {
    const hmac = crypto.createHmac('sha256', toBuffer(key));
    hmac.update(toBuffer(value));
    return toGasBytes(hmac.digest());
  }),

  base64Decode: jest.fn((encodedString) => {
    const buf = Buffer.from(encodedString, 'base64');
    return toGasBytes(buf);
  }),

  base64Encode: jest.fn((data) => {
    return toBuffer(data).toString('base64');
  }),

  base64EncodeWebSafe: jest.fn((data) => {
    return toBuffer(data).toString('base64url');
  })
};


/* global.SpreadsheetApp */

mockData = {
  Users: [
    ['id', 'user_name', 'user_pass', 'user_role', 'user_email', 'iat', 'roles', 'enabled', 'name', 'phone'],
    [1, 'Sergey', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'moderator', 'a@a.a'],
    [2, 'Alexander', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'admin', 'a@a.a'],
    [3, 'Nic', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'user', 'a@a.a'],
    [4, 'Peter', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'qa', 'a@a.a'],
    [5, 'Sonya', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'manager', 'a@a.a'],
    [6, 'Masha', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'user', 'a@a.a'],
    [7, 'Polina', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'user', 'a@a.a'],
    [8, 'Swares', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'user', 'a@a.a'],
    [9, 'Sergey', '99ffd43f750e9a08d493b9427f4629ed6954988a6a1a6f0f09a6014723d1213e', 'user', 'a@a.a'],
  ],
  Products: [
    ['id', 'owner', 'enabled', 'Title', 'price', 'currency', 'brand', 'Series', 'Author', 'Narrated', 'Translator', 'Language', 'Format', 'Publisher', 'Length', 'ReleaseDate', 'PublicationDate', 'link', 'linkEx', 'img', 'views', 'Genres', 'blocks'],
    [1, '1', true],
  ],
  Orders: [
    ['id', 'userID', 'status', 'user', 'orderID', 'order_time', 'total_price', 'total', 'description', 'ex', 'items'],
    [1, '1', 'pending'],
  ],
  Profiles: [
    ['id', 'owner', 'firstname', 'lastname', 'age', 'country', 'city', 'address', 'image', 'currency', 'phone'],
    [1, '1', 'John', 'Dore'],
  ],
  Comments: [
    ['id', 'owner', 'product_id', 'iat', 'text'],
    [1, '1', '1', '10-11-26'],
  ],
  Notifications: [
    ['id', 'owner', 'link', 'title', 'description'],
    [1, '1', '#', 'Shimano', 'Had been done'],
  ],
  Favorites: [
    ['id', 'owner', 'product_id', 'created_at'],
    [1, '1', '1', '10-11-26'],
  ],
};

global.SpreadsheetApp = {
  flush: jest.fn(() => { }),
  getActiveSpreadsheet: jest.fn(() => ({
    getSheetByName: jest.fn((collectionName) => ({
      getDataRange: jest.fn(() => ({
        getValues: jest.fn(() => mockData[collectionName].map(row => [...row])),
      })),
      getRange: jest.fn((row, col, numRows = 1, numCols = 1) => {
        setValuesMock = jest.fn((values) => {
          for (let r = 0; r < values.length; r++) {
            if (!mockData[collectionName][row - 1 + r]) {
              mockData[collectionName][row - 1 + r] = [];
            }
            for (let c = 0; c < values[r].length; c++) {
              mockData[collectionName][row - 1 + r][col - 1 + c] = values[r][c];
            }
          }
        });

        return { setValues: setValuesMock };
      }),
      deleteRow: jest.fn((rowPosition, howMany = 1) => {
        const index = rowPosition - 1;
        if (index >= 0 && index < mockData[collectionName].length) {
          mockData[collectionName].splice(index, howMany);
        }
      }),
      appendRow: jest.fn((row) => {
        mockData[collectionName].push(row);
      }),
      getLastRow: jest.fn(() => mockData[collectionName].length),
    })),
  })),
};

global.LockService = {
  getScriptLock: jest.fn(() => ({
    waitLock: jest.fn(),
    releaseLock: jest.fn()
  }))
};

global.MailApp = {
  sendEmail: jest.fn(() => { }),
  getRemainingDailyQuota: jest.fn(() => 100),
};
