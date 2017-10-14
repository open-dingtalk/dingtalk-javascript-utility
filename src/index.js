import dingQueryString from './package/dingtalk-querystring';
import dingUrl from './package/dingtalk-url';
import dingEnv from './package/dingtalk-env';
import dingCompareVersion from './package/dingtalk-version';
import dingRequireModule from './package/dingtalk-require';
import dingDocument from './package/dingtalk-document';
import dingTimer from './package/dingtalk-timer';
import dingLogger from './package/dingtalk-log';
import dingCallTransform from './package/dingtalk-callTransform';

export const querystring = dingQueryString;
export const url = dingUrl;
export const env = dingEnv;
export const compareVersion = dingCompareVersion;
export const requireModule = dingRequireModule;
export const document = dingDocument;
export const timer = dingTimer;
export const { log, setLog, LogType } = dingLogger;
export const callTransform = dingCallTransform;

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