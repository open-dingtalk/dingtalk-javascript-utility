'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogType = exports.setLog = exports.log = exports.timer = exports.document = exports.requireModule = exports.compareVersion = exports.env = exports.url = exports.querystring = undefined;

var _dingtalkQuerystring = require('./package/dingtalk-querystring');

var _dingtalkQuerystring2 = _interopRequireDefault(_dingtalkQuerystring);

var _dingtalkUrl = require('./package/dingtalk-url');

var _dingtalkUrl2 = _interopRequireDefault(_dingtalkUrl);

var _dingtalkEnv = require('./package/dingtalk-env');

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

var _dingtalkVersion = require('./package/dingtalk-version');

var _dingtalkVersion2 = _interopRequireDefault(_dingtalkVersion);

var _dingtalkRequire = require('./package/dingtalk-require');

var _dingtalkRequire2 = _interopRequireDefault(_dingtalkRequire);

var _dingtalkDocument = require('./package/dingtalk-document');

var _dingtalkDocument2 = _interopRequireDefault(_dingtalkDocument);

var _dingtalkTimer = require('./package/dingtalk-timer');

var _dingtalkTimer2 = _interopRequireDefault(_dingtalkTimer);

var _dingtalkLog = require('./package/dingtalk-log');

var _dingtalkLog2 = _interopRequireDefault(_dingtalkLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var querystring = exports.querystring = _dingtalkQuerystring2.default;
var url = exports.url = _dingtalkUrl2.default;
var env = exports.env = _dingtalkEnv2.default;
var compareVersion = exports.compareVersion = _dingtalkVersion2.default;
var requireModule = exports.requireModule = _dingtalkRequire2.default;
var document = exports.document = _dingtalkDocument2.default;
var timer = exports.timer = _dingtalkTimer2.default;
var log = _dingtalkLog2.default.log,
    setLog = _dingtalkLog2.default.setLog,
    LogType = _dingtalkLog2.default.LogType;
exports.log = log;
exports.setLog = setLog;
exports.LogType = LogType;
exports.default = {
  querystring: querystring,
  url: url,
  env: env,
  compareVersion: compareVersion,
  requireModule: requireModule,
  document: document,
  timer: timer,
  LogType: LogType,
  setLog: setLog,
  log: log
};
//# sourceMappingURL=index.js.map