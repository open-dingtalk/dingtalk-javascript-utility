'use strict';

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
  var searchString = url.slice(searchIndex + 1);
  var query = querystring.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0) {
    return query[parseQueryString];
  } else {
    return query;
  }
}

var URL = {
  format: format,
  parse: parse$1
};

function whatEnv() {
  var weexEnv = {};
  if (typeof weex !== 'undefined') {
    weexEnv.platform = weex.config.env.platform;
    weexEnv.bundleFrameworkType = 'Vue';
    weexEnv.appName = weex.config.env.appName;
  } else {
    // Rax Weex
    if (typeof callNative === 'function') {
      weexEnv.platform = navigator.platform;
      weexEnv.appName = navigator.appName;
    } else {
      // Rax Web
      weexEnv.platform = 'Web';
    }
    weexEnv.bundleFrameworkType = 'Rax';
  }
  return weexEnv;
}

var env = whatEnv();
var isiOS = env.platform === 'iOS';
var isAndroid = env.platform === 'Android';
var isDingtalk = env.appName === 'DingTalk';
var isWeexWeb = env.platform === 'Web';
var isWeexNative = isiOS || isAndroid;
var bundleFrameworkType = env.bundleFrameworkType;

var env$1 = {
  isiOS: isiOS,
  isAndroid: isAndroid,
  isDingtalk: isDingtalk,
  isWeexWeb: isWeexWeb,
  isWeexNative: isWeexNative,
  bundleFrameworkType: bundleFrameworkType
};

var index = {
  querystring: querystring,
  URL: URL,
  env: env$1
};

module.exports = index;
//# sourceMappingURL=journey.js.map
