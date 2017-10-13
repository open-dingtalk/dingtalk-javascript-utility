'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};























































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

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

var querystring = {
  stringify: stringify,
  parse: parse
};

function format(url, query) {
  var search = querystring.stringify(query);
  return url + '?' + search;
}

function parse$1(url, parseQueryString) {
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
  var query = querystring.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0) {
    return query[parseQueryString];
  } else {
    return query;
  }
}

var url = {
  format: format,
  parse: parse$1
};

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
      var tpl = url.parse(href, 'dd_wx_tpl');
      var _wx_tpl = url.parse(href, '_wx_tpl');
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
      var _tpl = url.parse(_href, 'dd_wx_tpl');
      var _wx_tpl2 = url.parse(_href, '_wx_tpl');
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
var dingtalk = env.dingtalk;
var bundleFrameworkType = env.bundleFrameworkType;
var bundleUrl = dingtalk.bundleUrl;
var originalUrl = dingtalk.originalUrl;


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

var env$1 = {
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

var bundleFrameworkType$1 = env$1.bundleFrameworkType;
var isWeex$1 = env$1.isWeex;


function requireModule(name) {
  if (isWeex$1) {
    if (bundleFrameworkType$1 === 'Vue') {
      return weex.requireModule(name);
    } else {
      var moduleName = '@weex-module/' + name;
      return __weex_require__(moduleName);
    }
  } else {
    if (bundleFrameworkType$1 === 'Vue') {
      return weex.requireModule(name);
    }
  }
}

var bundleFrameworkType$2 = env$1.bundleFrameworkType;
var isWeex$2 = env$1.isWeex;


function Document() {
  if (isWeex$2 && bundleFrameworkType$2 === 'Vue') {
    return weex.document;
  } else {
    return document;
  }
}

var doc = Document();

var timer = requireModule('timer');
var isWeex$3 = env$1.isWeex;


function setTimeout(handler, time) {
  if (isWeex$3) {
    timer.setTimeout(handler, time);
    return doc.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setTimeout(handler, time);
  }
}

function clearTimeout(n) {
  if (isWeex$3) {
    timer.clearTimeout(n);
  } else {
    window.clearTimeout(n);
  }
}

function setInterval(handler, time) {
  if (isWeex$3) {
    timer.setInterval(handler, time);
    return doc.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setInterval(handler, time);
  }
}

function clearInterva(n) {
  if (isWeex$3) {
    timer.clearInterva(n);
  } else {
    window.clearInterva(n);
  }
}

var timer$1 = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterva: clearInterva
};

var LOG = 'LOG';
var INFO = 'INFO';
var WARNING = 'WARNING';
var ERROR = 'ERROR';

var LogType$1 = {
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
    case LogType$1.LOG:
      (_console = console).log.apply(_console, ['time:' + time + ' | log: '].concat(toConsumableArray(logData.logArr)));
      break;
    case LogType$1.INFO:
      (_console2 = console).info.apply(_console2, ['time:' + time + ' | info: '].concat(toConsumableArray(logData.logArr)));
      break;
    case LogType$1.ERROR:
      (_console3 = console).error.apply(_console3, ['time:' + time + ' | error: '].concat(toConsumableArray(logData.logArr)));
      break;
    case LogType$1.WARNING:
      (_console4 = console).warn.apply(_console4, ['time:' + time + ' | warning: '].concat(toConsumableArray(logData.logArr)));
      break;
    default:
      break;
  }
};

var setLog$1 = function setLog(fn) {
  logChannel = fn;
};

var log$1 = function log(logArr) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LogType$1.LOG;

  logChannel({
    type: type,
    logArr: logArr,
    time: new Date()
  });
};

log$1(['current environment: ' + env$1.platform]);

var logger = {
  log: log$1,
  setLog: setLog$1,
  LogType: LogType$1
};

var log = logger.log;
var setLog = logger.setLog;
var LogType = logger.LogType;


var index = {
  querystring: querystring,
  url: url,
  env: env$1,
  compareVersion: compareVersion,
  requireModule: requireModule,
  document: doc,
  timer: timer$1,
  LogType: LogType,
  setLog: setLog,
  log: log
};

module.exports = index;
//# sourceMappingURL=journey.js.map
