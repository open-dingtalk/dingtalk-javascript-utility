const LOG = 'LOG';
const INFO = 'INFO';
const WARNING = 'WARNING';
const ERROR = 'ERROR';

const LogType = {
  LOG,
  INFO,
  WARNING,
  ERROR
}

function fillZore(str) {
    const res = '00' + str;
    return res.substring(res.length - 2);
}

let logChannel = (logData) => {
  const time = fillZore(logData.time.getHours())
      + ':' + fillZore(logData.time.getMinutes())
      + ':' + fillZore(logData.time.getSeconds());
  switch (logData.type) {
    case LogType.LOG:
        console.log('time:'+ time +' | log: ', ...logData.logArr);
      break;
    case LogType.INFO:
        console.info('time:'+ time + ' | info: ', ...logData.logArr);
      break;
    case LogType.ERROR:
        console.error('time:'+ time +' | error: ', ...logData.logArr);
      break;
    case LogType.WARNING:
        console.warn('time:'+ time +' | warning: ', ...logData.logArr);
      break;
    default:
      break;
  }
};

const setLog = (fn) => {
    logChannel = fn;
};

const log = (logArr, type = LogType.LOG) => {
  logChannel({
    type,
    logArr,
    time: new Date(),
  });
};

export default {
  log,
  setLog,
  LogType
}
