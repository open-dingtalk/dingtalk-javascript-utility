'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../util.js');

var _dingtalkUrl = require('../dingtalk-url');

var _dingtalkUrl2 = _interopRequireDefault(_dingtalkUrl);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dingtalkWebUrl(originalUrl) {
  var tpl = _dingtalkUrl2.default.parse(originalUrl, 'dd_wx_tpl');
  var _wx_tpl = _dingtalkUrl2.default.parse(originalUrl, '_wx_tpl');
  return {
    bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
    originalUrl: originalUrl
  };
}

function createContainerConfig() {
  var containerConfig = {};
  if (_constants.RUNTIME.WEB === _util.runtime) {
    containerConfig = dingtalkWebUrl(location.href);
  }
  if (_constants.RUNTIME.WEEX === _util.runtime) {
    if (_constants.FRAMEWORK.VUE === _util.framework) {
      var config = weex.config;
      containerConfig.bundleUrl = config.bundleUrl;
      containerConfig.originalUrl = config.originalUrl;
    }
    if (_constants.FRAMEWORK.RAX === _util.framework) {
      containerConfig.bundleUrl = __weex_options__.bundleUrl;
      containerConfig.originalUrl = __weex_options__.originalUrl;
    }
  }
  return containerConfig;
}

var containerConfig = createContainerConfig();

exports.default = containerConfig;
//# sourceMappingURL=index.js.map