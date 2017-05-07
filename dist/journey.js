'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
    var queryVal = items[1].trim();
    var cur = obj[queryKey];
    if (cur) {
      if (Array.isArray(cur)) {
        cur.push(queryVal);
      } else {
        var temp = cur;
        obj[queryKey] = new Array();
        obj[queryKey].push(temp);
        obj[queryKey].push(queryVal);
      }
    } else {
      obj[queryKey] = queryVal;
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
          fields += ks + v[j];
          if (j < vlast) {
            fields += sep;
          }
        }
        if (vlen && i < flast) {
          fields += sep;
        }
      } else {
        fields += ks + v;
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
  var searchIndex = url.indexOf('?');
  if (searchIndex === -1) {
    return null;
  }
  var searchString = url.slice(searchIndex + 1);
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

function whatEnv() {
  /*
    env Object ======= !!!!
     platform,
    bundleFrameworkType,
    dingtalk {
     bundleUrl,
     originalUrl
    }
    appName
    */
  var weexEnv = {};
  if (typeof weex !== 'undefined') {
    var config = weex.config;
    var _env = config.env;
    weexEnv.platform = _env.platform;
    weexEnv.bundleFrameworkType = 'Vue';
    if (weexEnv.platform !== 'Web') {
      weexEnv.dingtalk = {
        bundleUrl: config.bundleUrl,
        originalUrl: config.originalUrl
      };
      weexEnv.appName = _env.appName;
    } else {
      // Vue Web
      var href = location.href;
      var tpl = url.parse(href, 'dd_wx_tpl');
      weexEnv.dingtalk = {
        bundleUrl: tpl ? tpl : url.parse(href, '_wx_tpl'),
        originalUrl: href
      };
    }
  } else {
    // Rax Weex
    if (typeof callNative === 'function') {
      weexEnv.platform = navigator.platform;
      weexEnv.appName = navigator.appName;
    } else {
      // Rax Web
      weexEnv.platform = 'Web';
      var _href = location.href;
      var _tpl = url.parse(_href, 'dd_wx_tpl');
      weexEnv.dingtalk = {
        bundleUrl: _tpl ? _tpl : url.parse(_href, '_wx_tpl'),
        originalUrl: _href
      };
    }
    weexEnv.bundleFrameworkType = 'Rax';
  }
  return weexEnv;
}

var env = whatEnv();
var isiOS = env.platform === 'iOS';
var isAndroid = env.platform === 'Android';
var isWeb = env.platform === 'Web';
var isWeex = isiOS || isAndroid;
var dingtalk = env.dingtalk;
var bundleFrameworkType = env.bundleFrameworkType;
var bundleUrl = dingtalk.bundleUrl;
var originalUrl = dingtalk.originalUrl;

var isDingtalk = dingtalkContainer();

function dingtalkContainer() {
  if (isWeex) {
    return env.appName === 'DingTalk';
  } else {
    return (/DingTalk/.test(navigator.userAgent)
    );
  }
}

var env$1 = {
  isiOS: isiOS,
  isAndroid: isAndroid,
  isDingtalk: isDingtalk,
  isWeb: isWeb,
  isWeex: isWeex,
  bundleFrameworkType: bundleFrameworkType,
  bundleUrl: bundleUrl,
  originalUrl: originalUrl
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


function requireModule(name) {
  if (bundleFrameworkType$1 === 'Vue') {
    return weex.requireModule(name);
  } else {
    var moduleName = '@weex-module/' + name;
    return __weex_require__(moduleName);
  }
}

var bundleFrameworkType$2 = env$1.bundleFrameworkType;
var isWeex$1 = env$1.isWeex;


function Document() {
  if (isWeex$1 && bundleFrameworkType$2 === 'Vue') {
    return weex.document;
  } else {
    return document;
  }
}

var doc = Document();

var timer = requireModule('timer');
var isWeex$2 = env$1.isWeex;


function setTimeout(handler, time) {
  if (isWeex$2) {
    timer.setTimeout(handler, time);
    return doc.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setTimeout(handler, time);
  }
}

function clearTimeout(n) {
  if (isWeex$2) {
    timer.clearTimeout(n);
  } else {
    window.clearTimeout(n);
  }
}

function setInterval(handler, time) {
  if (isWeex$2) {
    timer.setInterval(handler, time);
    return doc.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setInterval(handler, time);
  }
}

function clearInterva(n) {
  if (isWeex$2) {
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

function initEnv() {
  var e = {};return "undefined" != typeof weex ? (e.platform = weex.config.env.platform, "Web" !== e.platform && (e.appName = weex.config.env.appName)) : "function" == typeof callNative ? (e.platform = navigator.platform, e.appName = navigator.appName) : e.platform = "Web", "Web" === e.platform ? e.isDingtalk = /DingTalk/.test(navigator.userAgent) : e.isDingtalk = "DingTalk" === e.appName, e;
}function initRequireModule() {
  var e = function e(_e) {
    var n = "@weex-module/" + _e;return __weex_require__(n);
  };return "undefined" != typeof weex && (e = weex.requireModule), e;
}function polyfills() {
  return { env: initEnv(), requireModule: initRequireModule() };
}function android_exec(e, n) {
  var i = n.body,
      t = n.onSuccess,
      r = n.onFail,
      o = n.context;e && "function" == typeof e ? e(i, function (e) {
    if (void 0 !== e && e.__status__) {
      var n = e.__status__,
          i = e.__message__;"1" === n ? t && t.call(o, i) : "2" === n && r && r.call(o, i);
    } else r && r.call("-1", "");
  }) : r && r.call("-1", "");
}function ios_exec(e, n) {
  var i = n.body,
      t = n.onSuccess,
      r = n.onFail,
      o = n.context;e && "function" == typeof e ? e(i, function (e) {
    void 0 !== e ? "0" === e.errorCode ? t && t.call(o, e.result) : r && r.call(o, e.result) : r && r.call("-1", "");
  }) : r && r.call("-1", "");
}function ios_exec$1(e) {
  var n = window._WebViewJavascriptBridge;if (!n) throw "runtime and bridge are not ready";var i = e.body,
      t = e.onSuccess,
      r = e.onFail,
      o = e.context;n.callHandler("exec", i, function (e) {
    void 0 !== e && ("0" === e.errorCode ? "function" == typeof t && t.call(o, e.result) : "function" == typeof r && r.call(o, e.result)), "function" == typeof r && r.call("-1", "");
  });
}function android_exec$1(e) {
  var n = e.body,
      i = e.onSuccess,
      t = e.onFail,
      r = e.context,
      o = n.plugin,
      a = n.action,
      u = n.args;(0, window.WebViewJavascriptBridgeAndroid)(o, a, u, i, t, r);
}function runAndroid() {
  window.WebViewJavascriptBridgeAndroid = window.nuva.require();
}function web_exec(e) {
  if (isIOS) window._WebViewJavascriptBridge ? ios_exec$1(e) : document.addEventListener("_WebViewJavascriptBridgeReady", function () {
    ios_exec$1(e);
  }, !1);else if (isAndroid$1) {
    var n = window;n.nuva && (void 0 === n.nuva.isReady || n.nuva.isReady) ? (bridgeReady || runAndroid(), android_exec$1(e)) : document.addEventListener("runtimeready", function () {
      bridgeReady || runAndroid(), android_exec$1(e);
    }, !1);
  }
}function exec(e) {
  var n = nativeExec || function () {};"iOS" === platform$2 ? ios_exec(n, e) : "android" === platform$2 ? android_exec(n, e) : web_exec(e);
}function build(e) {
  var n = e.factory;return e.__ship_exports__ = {}, delete e.factory, n(__ship_require__, e.__ship_exports__, e), e.__ship_exports__;
}function __ship_require__(e) {
  if (!__ship_modules__[e]) throw "__ship_module__ " + e + " not found";if (e in inProgressModules) {
    throw "Cycle in require graph: " + (requireStack.slice(inProgressModules[e]).join("->") + "->" + e);
  }if (__ship_modules__[e].factory) try {
    return inProgressModules[e] = requireStack.length, requireStack.push(e), build(__ship_modules__[e]);
  } finally {
    delete inProgressModules[e], requireStack.pop();
  }return __ship_modules__[e].__ship_exports__;
}function __ship_define__(e, n) {
  if (__ship_modules__[e]) throw "module " + e + " already defined";__ship_modules__[e] = { id: e, factory: n };
}function toArray$1(e, n) {
  for (var i = n || 0, t = e.length - i, r = new Array(t); t--;) {
    r[t] = e[t + i];
  }return r;
}function parseModules(e) {
  for (var n in e) {
    var i = e[n];!function (e, n) {
      __ship_define__(e, function (i, t, r) {
        var o = {};o._name = e;for (var a in n) {
          var u = n[a];o[u] = function (n) {
            return function (i) {
              i || (i = {});var t = i.onSuccess,
                  r = i.onFail;return delete i.onSuccess, delete i.onFail, delete i.onCancel, exec({ body: { plugin: e, action: n, args: i }, onSuccess: t, onFail: r });
            };
          }(u);
        }r.__ship_exports__ = o;
      });
    }(n, i);
  }
}function rtFunc(e) {
  return function (n) {
    exec({ body: { plugin: "runtime", action: e, args: {} }, onSuccess: function onSuccess(e) {
        "function" == typeof n && n(e);
      }, onFail: function onFail() {}, context: null });
  };
}function initDingtalkRequire(e) {
  rtFunc("getModules")(e);
}function checkConfigVars(e) {
  var n = Object.keys(e);checks.map(function (e) {
    0 === n.filter(function (n) {
      return e === n;
    }).length && logger.warn("configure : " + e + "is empty");
  });
}function parseJsApis(e) {
  var n = {};for (var i in e) {
    for (var t = i.split("."), r = null, o = 0, a = t.length;;) {
      if (r) {
        if (a - 1 === o) {
          r[t[o]] = ship.require(i);break;
        }r[t[o]] ? o++ : (r[t[o]] = {}, r = r[t[o]], o++);
      } else {
        if (1 === a) {
          n[t[o]] = ship.require(i);break;
        }if (n[t[o]]) {
          r = n[t[o]], o++;continue;
        }n[t[o]] = {}, r = n[t[o]], o++;
      }
    }
  }return n;
}function permissionJsApis(e, n, i) {
  if (!n) return void ship.ready(function () {
    e(null);
  });ship.ready(function () {
    var t = ship.require(runtimePermission),
        r = n || {},
        o = i || null;r.onSuccess = function (n) {
      e(null, n);
    }, r.onFail = function (n) {
      "function" == typeof o ? o(n) : e(n, null);
    }, t.requestJsApis(r);
  });
}function performQueue() {
  dingtalkQueue && dingtalkQueue.length > 0 && (dingtalkQueue.forEach(function (e) {
    e();
  }), dingtalkQueue.length = 0);
}function initDingtalkSDK() {
  var e = { isSync: !1, apis: {}, config: function (e) {
      function n(n) {
        return e.apply(this, arguments);
      }return n.toString = function () {
        return e.toString();
      }, n;
    }(function (e) {
      if (!e) return void logger.warn("config is undefined,you must configure Dingtalk parameters");"production" !== process.env.NODE_ENV && checkConfigVars(e), dingtalkJsApisConfig = e;
    }), init: function init() {
      dingtalkQueue = [], ship.init(), ship.ready(function () {
        e.isSync = !0, e.apis = parseJsApis(ship.getModules ? ship.getModules : {}), performQueue();
      });
    }, ready: function ready(n) {
      if (!n || "function" != typeof n) return void logger.warn("callback is undefined");if (e.isSync) permissionJsApis(n, dingtalkJsApisConfig, dingtalkErrorCb);else {
        dingtalkQueue && dingtalkQueue.push(function (e) {
          return function () {
            permissionJsApis(e, dingtalkJsApisConfig, dingtalkErrorCb);
          };
        }(n));
      }
    }, error: function error(e) {
      "function" == typeof e && (dingtalkErrorCb = e);
    } };return e;
}function installNativeEvent(e) {
  e.on = function (e, n, i) {
    document.addEventListener(e, n, i);
  }, e.off = function (e, n, i) {
    document.removeEventListener(e, n, i);
  };
}function initWebDingtalkSDK() {
  var e = initDingtalkSDK();return installNativeEvent(e), e;
}function installNativeEvent$2(e) {
  e.on = ship.on, e.off = ship.off;
}function initWeexDingtalkSDK() {
  var e = initDingtalkSDK();return installNativeEvent$2(e), e;
}var weexInstanceVar = void 0;weexInstanceVar || (weexInstanceVar = polyfills());var weexInstanceVar$1 = weexInstanceVar; var platform$3 = weexInstanceVar$1.env.platform; var isAndroid$1 = null; var isIOS = null; var bridgeReady = !1;if ("Web" === platform$3) {
  var UA = window.navigator.userAgent.toLowerCase();isAndroid$1 = UA && UA.indexOf("android") > -1, isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
}var platform$2 = weexInstanceVar$1.env.platform;
var nativeExec = null;"Web" !== platform$2 && (nativeExec = weexInstanceVar$1.requireModule("nuvajs-exec").exec);var __ship_modules__ = {}; var requireStack = []; var inProgressModules = {}; var cat = {}; var EventEmitter = { on: function on(e, n) {
    var i = cat[e];i ? i.push(n) : cat[e] = [], i || cat[e].push(n);
  }, off: function off(e, n) {
    var i = cat[e];if (!i) return !1;if (!e && !n) return cat = {}, !0;if (e && !n) return cat[e] = null, !0;for (var t = void 0, r = i.length; r--;) {
      if ((t = i[r]) === n || t.fun === n) {
        i.splice(r, 1);break;
      }
    }return !0;
  }, once: function once(e, n) {
    function i() {
      EventEmitter.off(e, i), n.apply(this, arguments);
    }i.fun = n, EventEmitter.on(e, i);
  }, emit: function emit(e) {
    if ("string" == typeof e) {
      var n = cat[e],
          i = toArray$1(arguments, 1);if (n) for (var t = 0, r = n.length; t < r; t++) {
        var o = n[t];o.apply(this, i);
      }
    }
  } }; var platform$1 = weexInstanceVar$1.env.platform; var globalEvent = {};"Web" !== platform$1 && (globalEvent = weexInstanceVar$1.requireModule("globalEvent"));var ship = { getModules: null, isReady: !1, define: __ship_define__, require: function require(e) {
    return e ? __ship_require__(e) : exec;
  }, runtime: { info: rtFunc("info"), _interceptBackButton: rtFunc("interceptBackButton"), _interceptNavTitle: rtFunc("interceptNavTitle"), _recoverNavTitle: rtFunc("recoverNavTitle"), _getModules: rtFunc("getModules") }, init: function init() {
    initDingtalkRequire(function (e) {
      e && (parseModules(e), ship.isReady = !0, ship.getModules = e, EventEmitter.emit("__ship_ready__"));
    });
  }, ready: function ready(e) {
    ship.isReady ? "function" == typeof e && e() : "function" == typeof e && EventEmitter.once("__ship_ready__", function () {
      e();
    });
  }, on: function on(e, n) {
    globalEvent.addEventListener(e, function (e) {
      var i = { preventDefault: function preventDefault() {
          console.warn("当前环境不支持 preventDefault");
        }, detail: e };n.call(this, i);
    });
  }, off: globalEvent.removeEventListener, EventEmitter: EventEmitter }; var logger = { warn: function warn(e, n) {
    if (console.warn("[DINGTALK JS SDK Warning]:", e), n) throw n;var i = new Error("WARNING STACK TRACE");console.warn(i.stack);
  }, info: function info(e) {
    console.info("[DINGTALK JS SDK INFO]:", e);
  }, error: function error(e) {
    console.error("[DINGTALK JS SDK ERROR]:", e);
  } }; var checks = ["agentId", "corpId", "timeStamp", "nonceStr", "signature", "jsApiList"]; var runtimePermission = "runtime.permission"; var dingtalkJsApisConfig = null; var dingtalkQueue = null; var dingtalkErrorCb = null; var dingtalkInit = !0; var platform = weexInstanceVar$1.env.platform; var isDingtalk$1 = weexInstanceVar$1.env.isDingtalk; var dingtalkSDK = {};if (isDingtalk$1 || logger.warn("can only open the page be Dingtalk Container"), dingtalkInit) {
  switch (dingtalkInit = !1, platform) {case "Web":
      dingtalkSDK = initWebDingtalkSDK();break;default:
      dingtalkSDK = initWeexDingtalkSDK();}dingtalkSDK.init();
}var dingtalkSDK$1 = dingtalkSDK;var weexDingtalkMin = dingtalkSDK$1;

var setTimeout$1 = timer$1.setTimeout;
var clearTimeout$1 = timer$1.clearTimeout;


function apisync() {
  var timeoutStatu = false;
  var apis = null;
  var container = Object.create(null);
  weexDingtalkMin.ready(function () {
    apis = weexDingtalkMin.apis;
  });
  var timeout = setTimeout$1(function () {
    timeoutStatu = true;
    clearTimeout$1(timeout);
  }, 5000);
  while (true) {
    if (timeoutStatu) {
      throw new Error('sync apis timeout 5000ms');
      break;
    }
    if (apis) {
      clearTimeout$1(timeout);
      break;
    }
  }
  if (!timeoutStatu && apis) {
    container = reloadApis(apis);
  }
  return container;
}

function reloadApis(apis) {
  var container = Object.create(null);
  for (var spaceName in apis) {
    var api = apis[spaceName];
    if (typeof api === 'function') {
      container[spaceName] = api;
    }
    if ((typeof api === 'undefined' ? 'undefined' : _typeof(api)) === 'object' && api !== null) {
      container[spaceName] = recursiveApis(spaceName, api, Object.create(null));
    }
  }
  return container;
}

function recursiveApis(spaceName, api, c, action) {
  var node = Object.keys(api);
  var i = 0;
  var j = node.length;

  var _loop = function _loop() {
    var apiName = node[i];
    if (typeof api[apiName] === 'function') {
      c[apiName] = function (conf) {
        weexDingtalkMin.ready(function () {
          var dd = weexDingtalkMin.apis;
          dd[spaceName][action][apiName](conf);
        });
      };
      return 'continue';
    }
    if (_typeof(api[apiName]) === 'object' && api[apiName] !== null) {
      c[apiName] = recursiveApis(spaceName, api[apiName], Object.create(null), apiName);
    }
  };

  for (; i < j; i++) {
    var _ret = _loop();

    if (_ret === 'continue') continue;
  }
  return c;
}

function dingtalkApiSync() {
  var apis = apisync();
  return apis;
}

var index = {
  querystring: querystring,
  url: url,
  env: env$1,
  compareVersion: compareVersion,
  requireModule: requireModule,
  document: doc,
  timer: timer$1,
  apisync: dingtalkApiSync
};

module.exports = index;
//# sourceMappingURL=journey.js.map
