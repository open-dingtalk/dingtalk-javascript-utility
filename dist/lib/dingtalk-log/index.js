'use strict';

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
//# sourceMappingURL=index.js.map