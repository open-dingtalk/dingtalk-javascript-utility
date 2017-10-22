'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dingtalkUrl = require('../dingtalk-url');

var _dingtalkUrl2 = _interopRequireDefault(_dingtalkUrl);

var _dingtalkLog = require('../dingtalk-log');

var _dingtalkLog2 = _interopRequireDefault(_dingtalkLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maybeInWebView = typeof window !== 'undefined';
var maybeInWeexVueEnv = typeof weex !== 'undefined';
var maybeInNative = typeof callNative !== 'undefined';
var log = _dingtalkLog2.default.log,
    LogType = _dingtalkLog2.default.LogType;


var snifferWeexRaxMap = ['__weex_config__', '__weex_options__', '__weex_require__'];

var snifferWebViewMap = ['localStorage', 'location', 'navigator', 'XMLHttpRequest'];

var snifferWeexVueMap = ['config', 'requireModule', 'document'];

var PLATFORMS = {
  WEB: 'Web',
  NATIVE: 'Native',
  UNKNOWN: 'Unknown'
};

var FRAMEWORK = {
  VUE: 'Vue',
  RAX: 'Rax',
  UNKNOWN: 'Unknown'
};

function snifferMachine(snifferMap, source) {
  var j = snifferMap.length;
  var i = 0;
  var result = true;
  for (; i < j; i++) {
    if (!source[snifferMap[i]]) {
      result = false;
      break;
    }
  }
  return result;
}

var platform = function () {
  if (maybeInWebView && maybeInWeexVueEnv) {
    // webview
    return snifferMachine(snifferWeexVueMap, weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexVueMap, weex) ? 'Native.Vue' : 'Native.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexRaxMap, window) ? 'Native.Rax' : 'Native.Unknown';
  } else {
    // default webview
    if (maybeInWebView) {
      return snifferMachine(snifferWebViewMap, window) ? 'Web.Unknown' : 'Unknown.Unknown';
    }
  }
  return 'Unknown.Unknown';
}();

var _platform$split = platform.split('.'),
    _platform$split2 = _slicedToArray(_platform$split, 2),
    platformEnv = _platform$split2[0],
    framework = _platform$split2[1];

function dingtalkWebUrl(originalUrl) {
  var tpl = _dingtalkUrl2.default.parse(originalUrl, 'dd_wx_tpl');
  var _wx_tpl = _dingtalkUrl2.default.parse(originalUrl, '_wx_tpl');
  return {
    bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
    originalUrl: originalUrl
  };
}

function getEnv() {
  var containerEnv = {};
  switch (framework) {
    case FRAMEWORK.VUE:
      var config = weex.config;
      var _env = config.env;
      containerEnv.platform = _env.platform;
      containerEnv.bundleFrameworkType = framework;
      if (PLATFORMS.NATIVE === platformEnv) {
        containerEnv.appVersion = _env.appVersion;
        containerEnv.appName = _env.appName;
        containerEnv.dingtalk = {
          bundleUrl: config.bundleUrl,
          originalUrl: config.originalUrl
        };
      }
      if (PLATFORMS.WEB === platformEnv) {
        containerEnv.dingtalk = dingtalkWebUrl(location.href);
      }
      break;
    case FRAMEWORK.RAX:
      if (PLATFORMS.NATIVE === platformEnv) {
        containerEnv.bundleFrameworkType = framework;
        containerEnv.platform = navigator.platform;
        containerEnv.appName = navigator.appName;
        containerEnv.appVersion = navigator.appVersion;
        containerEnv.dingtalk = {
          bundleUrl: __weex_options__.bundleUrl,
          originalUrl: __weex_options__.originalUrl
        };
      }
      break;
    case FRAMEWORK.UNKNOWN:
      if (PLATFORMS.WEB === platformEnv) {
        containerEnv.platform = PLATFORMS.WEB;
      }
      if (PLATFORMS.UNKNOWN === platformEnv) {
        log(['current platform environment is unknown, please checking.'], LogType.WARNING);
        containerEnv.platform = PLATFORMS.UNKNOWN;
      }
      containerEnv.bundleFrameworkType = FRAMEWORK.UNKNOWN;
      containerEnv.dingtalk = dingtalkWebUrl(location.href);
      break;
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


function ua() {
  if (isWeb) {
    return window.navigator.userAgent.toLowerCase();
  }
  return '';
}

function getPcConf() {
  var tempConf = {};
  if (isWeb) {
    var frameName = window.name;
    try {
      var frameConf = JSON.parse(frameName);
      tempConf.containerId = frameConf.containerId;
      tempConf.version = frameConf.hostVersion;
      tempConf.language = frameConf.language || '*';
    } catch (e) {
      log([JSON.stringify(e)], LogType.WARNING);
    }
  }
  return tempConf;
}

var UA = ua();
var pcConf = getPcConf();

function mdContainer() {
  if (isWeex) {
    if (env.appName === 'DingTalk' || env.appName === 'com.alibaba.android.rimet') {
      return true;
    }
    return false;
  } else {
    return UA.indexOf('dingtalk') > -1 || UA.indexOf('aliapp') > -1;
  }
}

function pdContainer() {
  if (isWeb) {
    return !!pcConf.containerId;
  }
  return false;
}

function fetchVersion() {
  if (isWeb) {
    if (pcConf.version) {
      return pcConf.version;
    } else {
      var matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
      if (matches === null) {
        matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
      }
      var _version = matches && matches[1] || 'Unknown';
      return _version;
    }
  } else {
    return env.appVersion;
  }
}

var isWebiOS = /iphone|ipad|ipod|ios/.test(UA);
var isWebAndroid = UA.indexOf('android') > -1;
var version = fetchVersion();
var isMobileDingtalk = mdContainer();
var isWindowsDingtalk = UA.indexOf('dingtalk-win') > -1;
var isMac = UA.indexOf('mac') > -1;
var isWin = UA.indexOf('win') > -1;
var isPC = pdContainer();

exports.default = {
  isMobileDingtalk: isMobileDingtalk,
  isWindowsDingtalk: isWindowsDingtalk,
  isMac: isMac,
  isWin: isWin,
  isPC: isPC,
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
  platform: platform
};
//# sourceMappingURL=index.js.map