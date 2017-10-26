'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkRequire = require('../dingtalk-require');

var _dingtalkRequire2 = _interopRequireDefault(_dingtalkRequire);

var _dingtalkDocument = require('../dingtalk-document');

var _dingtalkDocument2 = _interopRequireDefault(_dingtalkDocument);

var _util = require('../util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = (0, _dingtalkRequire2.default)('timer');

function setTimeout(handler, time) {
  if (_util.isWeex) {
    timer.setTimeout(handler, time);
    return _dingtalkDocument2.default.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setTimeout(handler, time);
  }
}

function clearTimeout(n) {
  if (_util.isWeex) {
    timer.clearTimeout(n);
  } else {
    window.clearTimeout(n);
  }
}

function setInterval(handler, time) {
  if (_util.isWeex) {
    timer.setInterval(handler, time);
    return _dingtalkDocument2.default.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setInterval(handler, time);
  }
}

function clearInterva(n) {
  if (_util.isWeex) {
    timer.clearInterva(n);
  } else {
    window.clearInterva(n);
  }
}

exports.default = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterva: clearInterva
};
//# sourceMappingURL=index.js.map