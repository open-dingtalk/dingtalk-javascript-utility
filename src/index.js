import querystring from 'dingtalk-querystring';
import url from 'dingtalk-url';
import env from 'dingtalk-env';
import compareVersion from 'dingtalk-version';
import requireModule from 'dingtalk-require';
import document from 'dingtalk-document';
import timer from 'dingtalk-timer';
import logger from 'dingtalk-log'

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