import dingQueryString from './dingtalk-querystring';
import dingUrl from './dingtalk-url';
import dingEnv from './dingtalk-env';
import dingCompareVersion from './dingtalk-version';
import dingRequireModule from './dingtalk-require';
import dingDocument from './dingtalk-document';
import dingTimer from './dingtalk-timer';
import dingLogger from './dingtalk-log';
import dingConfig from './dingtalk-config';

export const querystring = dingQueryString;
export const url = dingUrl;
export const env = dingEnv;
export const compareVersion = dingCompareVersion;
export const requireModule = dingRequireModule;
export const document = dingDocument;
export const timer = dingTimer;
export const { log, setLog, LogType } = dingLogger;
export const config = dingConfig;

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
  config
};