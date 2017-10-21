'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkUrl = require('../dingtalk-url');

var _dingtalkUrl2 = _interopRequireDefault(_dingtalkUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEnv() {
  var containerEnv = {};
  if (typeof weex !== 'undefined') {
    var config = weex.config;
    var _env = config.env;
    containerEnv.platform = _env.platform;
    containerEnv.bundleFrameworkType = 'Vue';
    if (containerEnv.platform !== 'Web') {
      containerEnv.dingtalk = {
        bundleUrl: config.bundleUrl,
        originalUrl: config.originalUrl
      };
      containerEnv.appVersion = _env.appVersion;
      containerEnv.appName = _env.appName;
    } else {
      // Vue Web
      var href = location.href;
      var tpl = _dingtalkUrl2.default.parse(href, 'dd_wx_tpl');
      var _wx_tpl = _dingtalkUrl2.default.parse(href, '_wx_tpl');
      containerEnv.dingtalk = {
        bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
        originalUrl: href
      };
    }
  } else {
    // Rax Weex
    if (typeof callNative === 'function') {
      containerEnv.platform = navigator.platform;
      containerEnv.appName = navigator.appName;
      containerEnv.appVersion = navigator.appVersion;
      containerEnv.dingtalk = {
        bundleUrl: __weex_options__.bundleUrl,
        originalUrl: __weex_options__.originalUrl
      };
    } else {
      // Rax Web
      containerEnv.platform = 'Web';
      var _href = location.href;
      var _tpl = _dingtalkUrl2.default.parse(_href, 'dd_wx_tpl');
      var _wx_tpl2 = _dingtalkUrl2.default.parse(_href, '_wx_tpl');
      containerEnv.dingtalk = {
        bundleUrl: _tpl ? _tpl : _wx_tpl2 ? _wx_tpl2 : '',
        originalUrl: _href
      };
    }
    containerEnv.bundleFrameworkType = 'Rax';
  }
  return containerEnv;
}

var env = getEnv();
var isWeb = env.platform === 'Web';
var isWeexiOS = env.platform === 'iOS';
var isWeexAndroid = env.platform === 'android';
var isWeex = isWeexiOS || isWeexAndroid;
var dingtalk = env.dingtalk,
    bundleFrameworkType = env.bundleFrameworkType;
var bundleUrl = dingtalk.bundleUrl,
    originalUrl = dingtalk.originalUrl;


var UA = void 0;
if (isWeb) {
  UA = window.navigator.userAgent.toLowerCase();
}

var isDingtalk = dingtalkContainer();

function dingtalkContainer() {
  if (isWeex) {
    if (env.appName === 'DingTalk' || env.appName === 'com.alibaba.android.rimet') {
      return true;
    }
    return false;
  } else {
    return UA && UA.indexOf('dingtalk') > -1;
  }
}

function webAndroid() {
  if (isWeb) {
    return UA && UA.indexOf('android') > -1;
  }
  return null;
}

function webiOS() {
  if (isWeb) {
    return UA && /iphone|ipad|ipod|ios/.test(UA);
  }
  return null;
}

function fetchVersion() {
  if (isWeb) {
    var matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
    if (matches === null) {
      matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
    }
    var _version = matches && matches[1];
    return _version;
  } else {
    return env.appVersion;
  }
}

var isWebiOS = webiOS();
var isWebAndroid = webAndroid();
var version = fetchVersion();

function toPlatform() {
  var platform = void 0;
  if (isDingtalk) {
    if (isWebAndroid) {
      platform = 'web.android';
    } else if (isWebiOS) {
      platform = 'web.ios';
    } else if (isWeexAndroid) {
      platform = 'weex.android';
    } else if (isWeexiOS) {
      platform = 'weex.ios';
    }
  } else {
    platform = 'not.dingtalk';
  }
  return platform;
}

exports.default = {
  isDingtalk: isDingtalk,
  isWeb: isWeb,
  isWebiOS: isWebiOS,
  isWebAndroid: isWebAndroid,
  isWeex: isWeex,
  isWeexiOS: isWeexiOS,
  isWeexAndroid: isWeexAndroid,
  bundleFrameworkType: bundleFrameworkType,
  bundleUrl: bundleUrl,
  originalUrl: originalUrl,
  version: version,
  platform: toPlatform()
};
//# sourceMappingURL=index.js.map