import querystring from './package/dingtalk-querystring';
import url from './package/dingtalk-url';
import env from './package/dingtalk-env';
import compareVersion from './package/dingtalk-version';
import requireModule from './package/dingtalk-require';
import document from './package/dingtalk-document';
import timer from './package/dingtalk-timer';
import logger from './package/dingtalk-log';
import dingtalkCallTransform from './package/dingtalk-callTransform';

const { log, setLog, LogType } = logger;
const { callTransform, setCallTransformSource } = dingtalkCallTransform;

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
  log,
  callTransform
};