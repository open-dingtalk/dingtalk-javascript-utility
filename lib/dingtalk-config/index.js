'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkEnv = require('../dingtalk-env');

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

var _dingtalkUrl = require('../dingtalk-url');

var _dingtalkUrl2 = _interopRequireDefault(_dingtalkUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var framework = _dingtalkEnv2.default.framework,
    runtime = _dingtalkEnv2.default.runtime;


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
  if (_dingtalkEnv.RUNTIME.WEB === runtime) {
    containerConfig = dingtalkWebUrl(location.href);
  }
  if (_dingtalkEnv.RUNTIME.WEEX === runtime) {
    if (_dingtalkEnv.FRAMEWORK.VUE === framework) {
      var config = weex.config;
      containerConfig.bundleUrl = config.bundleUrl;
      containerConfig.originalUrl = config.originalUrl;
    }
    if (_dingtalkEnv.FRAMEWORK.RAX === framework) {
      containerConfig.bundleUrl = __weex_options__.bundleUrl;
      containerConfig.originalUrl = __weex_options__.originalUrl;
    }
  }
  return containerConfig;
}

var containerConfig = createContainerConfig();

exports.default = containerConfig;
//# sourceMappingURL=index.js.map