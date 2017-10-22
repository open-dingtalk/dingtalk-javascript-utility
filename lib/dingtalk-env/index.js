'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FRAMEWORK = exports.PLATFORM = exports.RUNTIME = undefined;

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

var RUNTIME = exports.RUNTIME = {
  WEB: 'Web',
  WEEX: 'Weex',
  UNKNOWN: 'Unknown'
};

var PLATFORM = exports.PLATFORM = {
  MAC: 'Mac',
  WINDOWS: 'Windows',
  IOS: 'iOS',
  ANDROID: 'Android',
  IPAD: 'iPad'
};

var FRAMEWORK = exports.FRAMEWORK = {
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

function whichOneRuntime() {
  if (maybeInWebView && maybeInWeexVueEnv) {
    // webview
    return snifferMachine(snifferWeexVueMap, weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexVueMap, weex) ? 'Weex.Vue' : 'Weex.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexRaxMap, window) ? 'Weex.Rax' : 'Weex.Unknown';
  } else {
    // default webview
    if (maybeInWebView) {
      return snifferMachine(snifferWebViewMap, window) ? 'Web.Unknown' : 'Unknown.Unknown';
    }
  }
  return 'Unknown.Unknown';
}

var _whichOneRuntime$spli = whichOneRuntime().split('.'),
    _whichOneRuntime$spli2 = _slicedToArray(_whichOneRuntime$spli, 2),
    runtime = _whichOneRuntime$spli2[0],
    framework = _whichOneRuntime$spli2[1];

function getEnv() {
  var containerEnv = {};
  switch (framework) {
    case FRAMEWORK.VUE:
      var _env = config.env;
      containerEnv.platform = _env.platform;
      if (RUNTIME.WEEX === runtime) {
        containerEnv.appVersion = _env.appVersion;
        containerEnv.appName = _env.appName;
      }
      break;
    case FRAMEWORK.RAX:
      if (RUNTIME.WEEX === runtime) {
        containerEnv.platform = navigator.platform;
        containerEnv.appName = navigator.appName;
        containerEnv.appVersion = navigator.appVersion;
      }
      break;
    case FRAMEWORK.UNKNOWN:
      if (RUNTIME.WEB === runtime) {
        containerEnv.platform = RUNTIME.WEB;
      }
      if (RUNTIME.UNKNOWN === runtime) {
        log(['current runtime environment is unknown, please checking.'], LogType.WARNING);
        containerEnv.platform = RUNTIME.UNKNOWN;
      }
      break;
  }
  return containerEnv;
}

var env = getEnv();
var isWeb = env.platform === 'Web';
var isWeexiOS = env.platform === 'iOS';
var isWeexAndroid = env.platform === 'android';
var isWeex = isWeexAndroid && isWeexiOS;

function ua() {
  if (isWeb) {
    return window.navigator.userAgent;
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

function dingTalkContainer() {
  if (isWeex) {
    if (env.appName === 'DingTalk' || env.appName === 'com.alibaba.android.rimet') {
      return true;
    }
    return false;
  } else {
    return UA.indexOf('dingtalk') > -1 || UA.indexOf('aliapp') > -1 || UA.indexOf('dingtalk-win') > -1;
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
var isDingtalk = dingTalkContainer();
var isPCMac = UA.indexOf('mac') > -1;
var isPCWindows = UA.indexOf('win') > -1;
var isPC = pdContainer();

exports.default = {
  isDingtalk: isDingtalk,
  isWebiOS: isWebiOS,
  isWebAndroid: isWebAndroid,
  isWeexiOS: isWeexiOS,
  isWeexAndroid: isWeexAndroid,
  version: version,
  runtime: runtime,
  framework: framework,
  platform: ''
};
//# sourceMappingURL=index.js.map