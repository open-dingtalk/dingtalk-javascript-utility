(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DTUtility", [], factory);
	else if(typeof exports === 'object')
		exports["DTUtility"] = factory();
	else
		root["DTUtility"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkUrl = __webpack_require__(2);

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function parse(qs, sep, eq) {
  var obj = Object.create(null);
  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }
  sep = sep || '&';
  eq = eq || '=';
  var params = qs.split(sep);
  var i = 0;
  var l = params.length;
  for (; i < l; i++) {
    var items = params[i].split(eq);
    var queryKey = items[0].trim();
    var queryVal = '';
    if (items.length >= 3) {
      (function () {
        items.splice(0, 1);
        var lastIndex = items.length - 1;
        items.forEach(function (v, i) {
          v = v.trim();
          if (i === lastIndex) {
            queryVal += v;
          } else {
            queryVal += v + eq;
          }
        });
      })();
    } else {
      queryVal = items[1].trim();
    }
    var cur = obj[queryKey];
    if (cur) {
      if (Array.isArray(cur)) {
        cur.push(decodeURIComponent(queryVal));
      } else {
        var temp = cur;
        obj[queryKey] = new Array();
        obj[queryKey].push(temp);
        obj[queryKey].push(decodeURIComponent(queryVal));
      }
    } else {
      obj[queryKey] = decodeURIComponent(queryVal);
    }
  }
  return obj;
}

function stringify(obj, sep, eq) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    var keys = Object.keys(obj);
    var len = keys.length;
    var flast = len - 1;
    var fields = '';
    var i = 0;
    for (; i < len; i++) {
      var k = keys[i];
      var v = obj[k];
      var ks = k + eq;
      if (Array.isArray(v)) {
        var vlen = v.length;
        var vlast = vlen - 1;
        var j = 0;
        for (; j < vlen; ++j) {
          fields += ks + decodeURIComponent(v[j]);
          if (j < vlast) {
            fields += sep;
          }
        }
        if (vlen && i < flast) {
          fields += sep;
        }
      } else {
        fields += ks + decodeURIComponent(v);
        if (i < flast) {
          fields += sep;
        }
      }
    }
    return fields;
  }
  return '';
}

exports.default = {
  stringify: stringify,
  parse: parse
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkQuerystring = __webpack_require__(1);

var _dingtalkQuerystring2 = _interopRequireDefault(_dingtalkQuerystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function format(url, query) {
  var search = _dingtalkQuerystring2.default.stringify(query);
  return url + '?' + search;
}

function parse(url, parseQueryString) {
  var location = {
    hash: null,
    search: null
  };
  if (!url) {
    return {};
  }
  var searchIndex = url.indexOf('?');
  if (searchIndex === -1) {
    return {};
  }
  var hashIndex = url.indexOf('#');
  if (hashIndex > -1) {
    location.hash = url.slice(hashIndex);
    location.search = url.slice(searchIndex, hashIndex);
  } else {
    location.search = url.slice(searchIndex);
  }
  var searchString = location.search.slice(1);
  var query = _dingtalkQuerystring2.default.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0) {
    return query[parseQueryString];
  } else {
    return query;
  }
}

exports.default = {
  format: format,
  parse: parse
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requireModule;

var _dingtalkEnv = __webpack_require__(0);

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bundleFrameworkType = _dingtalkEnv2.default.bundleFrameworkType,
    isWeex = _dingtalkEnv2.default.isWeex;
function requireModule(name) {
  if (isWeex) {
    if (bundleFrameworkType === 'Vue') {
      return weex.requireModule(name);
    } else {
      var moduleName = '@weex-module/' + name;
      return __weex_require__(moduleName);
    }
  } else {
    if (bundleFrameworkType === 'Vue') {
      return weex.requireModule(name);
    }
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkEnv = __webpack_require__(0);

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bundleFrameworkType = _dingtalkEnv2.default.bundleFrameworkType,
    isWeex = _dingtalkEnv2.default.isWeex;


function Document() {
  if (isWeex && bundleFrameworkType === 'Vue') {
    return weex.document;
  } else {
    return document;
  }
}

var doc = Document();

exports.default = doc;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogType = exports.setLog = exports.log = exports.timer = exports.document = exports.requireModule = exports.compareVersion = exports.env = exports.url = exports.querystring = undefined;

var _dingtalkQuerystring = __webpack_require__(1);

var _dingtalkQuerystring2 = _interopRequireDefault(_dingtalkQuerystring);

var _dingtalkUrl = __webpack_require__(2);

var _dingtalkUrl2 = _interopRequireDefault(_dingtalkUrl);

var _dingtalkEnv = __webpack_require__(0);

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

var _dingtalkVersion = __webpack_require__(6);

var _dingtalkVersion2 = _interopRequireDefault(_dingtalkVersion);

var _dingtalkRequire = __webpack_require__(3);

var _dingtalkRequire2 = _interopRequireDefault(_dingtalkRequire);

var _dingtalkDocument = __webpack_require__(4);

var _dingtalkDocument2 = _interopRequireDefault(_dingtalkDocument);

var _dingtalkTimer = __webpack_require__(7);

var _dingtalkTimer2 = _interopRequireDefault(_dingtalkTimer);

var _dingtalkLog = __webpack_require__(8);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compareVersion;
function compareVersion(oldVersion, newVersion, containEqual) {
  if (typeof oldVersion !== 'string' || typeof newVersion !== 'string') {
    return false;
  }
  //分割字符串为['1', '0', '1']格式
  var oldArray = oldVersion.split('.');
  var newArray = newVersion.split('.');
  var o = void 0;
  var n = void 0;
  do {
    o = oldArray.shift();
    n = newArray.shift();
  } while (o === n && newArray.length > 0);
  if (containEqual) {
    return (n | 0) >= (o | 0);
  } else {
    return (n | 0) > (o | 0);
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkRequire = __webpack_require__(3);

var _dingtalkRequire2 = _interopRequireDefault(_dingtalkRequire);

var _dingtalkDocument = __webpack_require__(4);

var _dingtalkDocument2 = _interopRequireDefault(_dingtalkDocument);

var _dingtalkEnv = __webpack_require__(0);

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = (0, _dingtalkRequire2.default)('timer');
var isWeex = _dingtalkEnv2.default.isWeex;


function setTimeout(handler, time) {
  if (isWeex) {
    timer.setTimeout(handler, time);
    return _dingtalkDocument2.default.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setTimeout(handler, time);
  }
}

function clearTimeout(n) {
  if (isWeex) {
    timer.clearTimeout(n);
  } else {
    window.clearTimeout(n);
  }
}

function setInterval(handler, time) {
  if (isWeex) {
    timer.setInterval(handler, time);
    return _dingtalkDocument2.default.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setInterval(handler, time);
  }
}

function clearInterva(n) {
  if (isWeex) {
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var LOG = 'LOG';
var INFO = 'INFO';
var WARNING = 'WARNING';
var ERROR = 'ERROR';

var LogType = {
  LOG: LOG,
  INFO: INFO,
  WARNING: WARNING,
  ERROR: ERROR
};

function fillZore(str) {
  var res = '00' + str;
  return res.substring(res.length - 2);
}

var logChannel = function logChannel(logData) {
  var _console, _console2, _console3, _console4;

  var time = fillZore(logData.time.getHours()) + ':' + fillZore(logData.time.getMinutes()) + ':' + fillZore(logData.time.getSeconds());
  switch (logData.type) {
    case LogType.LOG:
      (_console = console).log.apply(_console, ['time:' + time + ' | log: '].concat(_toConsumableArray(logData.logArr)));
      break;
    case LogType.INFO:
      (_console2 = console).info.apply(_console2, ['time:' + time + ' | info: '].concat(_toConsumableArray(logData.logArr)));
      break;
    case LogType.ERROR:
      (_console3 = console).error.apply(_console3, ['time:' + time + ' | error: '].concat(_toConsumableArray(logData.logArr)));
      break;
    case LogType.WARNING:
      (_console4 = console).warn.apply(_console4, ['time:' + time + ' | warning: '].concat(_toConsumableArray(logData.logArr)));
      break;
    default:
      break;
  }
};

var setLog = function setLog(fn) {
  logChannel = fn;
};

var log = function log(logArr) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LogType.LOG;

  logChannel({
    type: type,
    logArr: logArr,
    time: new Date()
  });
};

exports.default = {
  log: log,
  setLog: setLog,
  LogType: LogType
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=dingtalk-javascript-utility.js.map