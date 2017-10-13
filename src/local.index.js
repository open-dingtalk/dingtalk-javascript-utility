import querystring from './package/dingtalk-querystring';
import url from './package/dingtalk-url';
import env from './package/dingtalk-env';
import compareVersion from './package/dingtalk-version';
import requireModule from './package/dingtalk-require';
import document from './package/dingtalk-document';
import timer from './package/dingtalk-timer';
import logger from './package/dingtalk-log'

const { log, setLog, LogType } = logger;

export default {
  querystring,
  url,
  env,
  compareVersion,
  requireModule,
  document,
  timer,
  LogType, 
  setLog, 
  log
};