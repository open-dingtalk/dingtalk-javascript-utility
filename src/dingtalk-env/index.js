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

export const RUNTIME = {
  WEB: 'Web',
  WEEX: 'Weex',
  UNKNOWN: 'Unknown'
}

export const DEVICE = {
  
}

export const PLATFORM = {
  MAC: 'Mac',
  WINDOWS: 'Windows',
  IOS: 'iOS',
  ANDROID: 'Android',
  IPAD: 'iPad'
}

export const FRAMEWORK = {
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

function whichOneRuntime(){
  if (maybeInWebView && maybeInWeexVueEnv){
    // webview
    return snifferMachine(snifferWeexVueMap,weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexVueMap,weex) ? 'Weex.Vue' : 'Weex.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexRaxMap,window) ? 'Weex.Rax' : 'Weex.Unknown';
  } else {
    // default webview
    if (maybeInWebView){
      return snifferMachine(snifferWebViewMap,window) ? 'Web.Unknown' : 'Unknown.Unknown';
    } 
  }
  return 'Unknown.Unknown';
}

const [ runtime, framework ] = whichOneRuntime().split('.');

function getEnv(){
  let containerEnv = {};
  switch (framework){
    case FRAMEWORK.VUE:
        const env = config.env;
        containerEnv.platform = env.platform;
        if (RUNTIME.WEEX === runtime){
          containerEnv.appVersion = env.appVersion;
          containerEnv.appName = env.appName;
        }
      break;
    case FRAMEWORK.RAX:
        if (RUNTIME.WEEX === runtime) {
          containerEnv.platform = navigator.platform;
          containerEnv.appName = navigator.appName;
          containerEnv.appVersion = navigator.appVersion;
        }
      break;
    case FRAMEWORK.UNKNOWN:
        if (RUNTIME.WEB === runtime){
          containerEnv.platform = RUNTIME.WEB;
        }
        if (RUNTIME.UNKNOWN === runtime){
          log(['current runtime environment is unknown, please checking.'],LogType.WARNING);
          containerEnv.platform = RUNTIME.UNKNOWN;
        }        
      break;
  }  
  return containerEnv;
}

const env = getEnv();
const isWeb = env.platform === 'Web';
const isWeexiOS = env.platform === 'iOS';
const isWeexAndroid = env.platform === 'android';
const isWeex = isWeexAndroid && isWeexiOS;

function ua(){
  if(isWeb){
    return window.navigator.userAgent;
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

function dingTalkContainer(){
  if (isWeex){
    if (env.appName === 'DingTalk' || env.appName === 'com.alibaba.android.rimet'){
      return true;
    }
    return false;
  } else {
    return UA.indexOf('dingtalk') > -1 || UA.indexOf('aliapp') > -1 || UA.indexOf('dingtalk-win') > -1;
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
const isDingtalk = dingTalkContainer();
const isPCMac = UA.indexOf('mac') > -1;
const isPCWindows = UA.indexOf('win') > -1;
const isPC = pdContainer();

export default {
  isDingtalk,
  isWebiOS,
  isWebAndroid,
  isWeexiOS,
  isWeexAndroid,
  version,
  runtime,
  framework,
  platform: ''
};
