import url from '../dingtalk-url';
import logger from '../dingtalk-log';

const maybeInWebView = typeof window !== 'undefined';
const maybeInWeexVueEnv = typeof weex !== 'undefined';
const maybeInNative = typeof callNative !== 'undefined';
const { log, LogType } = logger;

const snifferWeexRaxMap = [
  '__weex_config__',
  '__weex_options__',
  '__weex_require__'
];

const snifferWebViewMap = [
  'localStorage',
  'location',
  'navigator',
  'XMLHttpRequest'
];

const snifferWeexVueMap = [
  'config',
  'requireModule',
  'document'
];

const PLATFORMS = {
  WEB: 'Web',
  NATIVE: 'Native',
  UNKNOWN: 'Unknown'
};

const FRAMEWORK = {
  VUE: 'Vue',
  RAX: 'Rax',
  UNKNOWN: 'Unknown'
};

function snifferMachine(snifferMap,source){
  const j = snifferMap.length;
  let i = 0;
  let result = true;
  for(;i < j; i++){
    if (!source[snifferMap[i]]){
      result = false;
      break;
    }
  }
  return result;
}

const platform = (() => {
  if (maybeInWebView && maybeInWeexVueEnv){
    // webview
    return snifferMachine(snifferWeexVueMap,weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexVueMap,weex) ? 'Native.Vue' : 'Native.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexRaxMap,window) ? 'Native.Rax' : 'Native.Unknown';
  } else {
    // default webview
    if (maybeInWebView){
      return snifferMachine(snifferWebViewMap,window) ? 'Web.Unknown' : 'Unknown.Unknown';
    } 
  }
  return 'Unknown.Unknown';
})();

const [ platformEnv, framework ] = platform.split('.');

function dingtalkWebUrl(originalUrl){
  const tpl = url.parse(originalUrl,'dd_wx_tpl');
  const _wx_tpl = url.parse(originalUrl,'_wx_tpl');
  return {
    bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
    originalUrl
  }
}

function getEnv(){
  let containerEnv = {};
  switch (framework){
    case FRAMEWORK.VUE:
        const config = weex.config;
        const env = config.env;
        containerEnv.platform = env.platform;
        containerEnv.bundleFrameworkType = framework;
        if (PLATFORMS.NATIVE === platformEnv){
          containerEnv.appVersion = env.appVersion;
          containerEnv.appName = env.appName;
          containerEnv.dingtalk = {
            bundleUrl: config.bundleUrl,
            originalUrl: config.originalUrl
          }
        }
        if (PLATFORMS.WEB === platformEnv){
          containerEnv.dingtalk = dingtalkWebUrl(location.href);
        }
      break;
    case FRAMEWORK.RAX:
        if (PLATFORMS.NATIVE === platformEnv) {
          containerEnv.bundleFrameworkType = framework;
          containerEnv.platform = navigator.platform;
          containerEnv.appName = navigator.appName;
          containerEnv.appVersion = navigator.appVersion;
          containerEnv.dingtalk = {
            bundleUrl: __weex_options__.bundleUrl,
            originalUrl: __weex_options__.originalUrl
          };
        }
      break;
    case FRAMEWORK.UNKNOWN:
        if (PLATFORMS.WEB === platformEnv){
          containerEnv.platform = PLATFORMS.WEB;
        }
        if (PLATFORMS.UNKNOWN === platformEnv){
          log(['current platform environment is unknown, please checking.'],LogType.WARNING);
          containerEnv.platform = PLATFORMS.UNKNOWN;
        }
        containerEnv.bundleFrameworkType = FRAMEWORK.UNKNOWN;
        containerEnv.dingtalk = dingtalkWebUrl(location.href);
      break;
  }  
  return containerEnv;
}

const env = getEnv();
const isWeb = env.platform === 'Web';
const isWeexiOS = env.platform === 'iOS';
const isWeexAndroid = env.platform === 'android';
const isWeex = isWeexiOS || isWeexAndroid;
const { dingtalk, bundleFrameworkType } = env;
const { bundleUrl, originalUrl } = dingtalk;

function ua(){
  if(isWeb){
    return window.navigator.userAgent.toLowerCase();
  }
  return '';
}

function getPcConf(){
  let tempConf = {}
  if(isWeb){
    const frameName = window.name;
    try{
      const frameConf = JSON.parse(frameName);
      tempConf.containerId = frameConf.containerId;
      tempConf.version = frameConf.hostVersion;
      tempConf.language = frameConf.language || '*';
    }catch(e){
      log([JSON.stringify(e)],LogType.WARNING);
    }
  }
  return tempConf;
}

const UA = ua();
const pcConf = getPcConf();

function mdContainer(){
  if (isWeex){
    if (env.appName === 'DingTalk' || env.appName === 'com.alibaba.android.rimet'){
      return true;
    }
    return false;
  } else {
    return UA.indexOf('dingtalk') > -1 || UA.indexOf('aliapp') > -1;
  }
}

function pdContainer(){
  if (isWeb){
    return !!pcConf.containerId
  }
  return false;
}

function fetchVersion(){
  if (isWeb){
    if (pcConf.version){
      return pcConf.version;
    } else {
      let matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
      if (matches === null) {
          matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
      }
      let version = (matches && matches[1]) || 'Unknown';
      return version;
    }
  } else {
    return env.appVersion;
  }
}

const isWebiOS = /iphone|ipad|ipod|ios/.test(UA);
const isWebAndroid = UA.indexOf('android') > -1;
const version = fetchVersion();
const isMobileDingtalk = mdContainer();
const isWindowsDingtalk = UA.indexOf('dingtalk-win') > -1;
const isMac = UA.indexOf('mac') > -1;
const isWin = UA.indexOf('win') > -1;
const isPC = pdContainer();

export default {
  isMobileDingtalk,
  isWindowsDingtalk,
  isMac,
  isWin,
  isPC,
  isWeb,
  isWebiOS,
  isWebAndroid,
  isWeex,
  isWeexiOS,
  isWeexAndroid,
  bundleFrameworkType,
  bundleUrl,
  originalUrl,
  version,
  platform: platform
};
