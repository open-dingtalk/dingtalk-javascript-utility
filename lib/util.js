'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWeex = exports.isWeexAndroid = exports.isWeexiOS = exports.isWebAndroid = exports.isWebiOS = exports.isDingtalk = exports.runtime = exports.framework = undefined;

var _dingtalkEnv = require('./dingtalk-env');

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var framework = _dingtalkEnv2.default.framework,
    runtime = _dingtalkEnv2.default.runtime,
    isDingtalk = _dingtalkEnv2.default.isDingtalk,
    isWebiOS = _dingtalkEnv2.default.isWebiOS,
    isWebAndroid = _dingtalkEnv2.default.isWebAndroid,
    isWeexiOS = _dingtalkEnv2.default.isWeexiOS,
    isWeexAndroid = _dingtalkEnv2.default.isWeexAndroid;
exports.framework = framework;
exports.runtime = runtime;
exports.isDingtalk = isDingtalk;
exports.isWebiOS = isWebiOS;
exports.isWebAndroid = isWebAndroid;
exports.isWeexiOS = isWeexiOS;
exports.isWeexAndroid = isWeexAndroid;
var isWeex = exports.isWeex = isWeexAndroid || isWeexiOS;
//# sourceMappingURL=util.js.map