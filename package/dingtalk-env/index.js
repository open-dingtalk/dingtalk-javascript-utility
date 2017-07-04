import url from 'dingtalk-url';

function whatEnv(){
  /*
    env Object ======= !!!!

    platform,
    bundleFrameworkType,
    dingtalk {
     bundleUrl,
     originalUrl
    }
    appName

   */
  let weexEnv = {};
  if (typeof weex !== 'undefined'){
    const config = weex.config;
    const env = config.env;
    weexEnv.platform = env.platform;
    weexEnv.bundleFrameworkType = 'Vue';
    if (weexEnv.platform !== 'Web'){
      weexEnv.dingtalk = {
        bundleUrl: config.bundleUrl,
        originalUrl: config.originalUrl
      };
      weexEnv.appVersion = env.appVersion;
      weexEnv.appName = env.appName;
    } else {
      // Vue Web
      const href = location.href;
      const tpl = url.parse(href,'dd_wx_tpl');
      const _wx_tpl = url.parse(href,'_wx_tpl');
      weexEnv.dingtalk = {
        bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
        originalUrl: href
      }
    }
  } else {
    // Rax Weex
    if (typeof callNative === 'function'){
      weexEnv.platform = navigator.platform;
      weexEnv.appName = navigator.appName;
      weexEnv.appVersion = navigator.appVersion;
      weexEnv.dingtalk = {
        bundleUrl: __weex_options__.bundleUrl,
        originalUrl: __weex_options__.originalUrl
      };
    } else {
      // Rax Web
      weexEnv.platform = 'Web';
      const href = location.href;
      const tpl = url.parse(href,'dd_wx_tpl');
      const _wx_tpl = url.parse(href,'_wx_tpl');
      weexEnv.dingtalk = {
        bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
        originalUrl: href
      }
    }
    weexEnv.bundleFrameworkType = 'Rax';
  }
  return weexEnv;
}

const env = whatEnv();
const isWeb = env.platform === 'Web';
const isWeexiOS = env.platform === 'iOS';
const isWeexAndroid = env.platform === 'android';
const isWeex = isWeexiOS || isWeexAndroid;
const { dingtalk, bundleFrameworkType } = env;
const { bundleUrl, originalUrl } = dingtalk;

let UA;
if(isWeb){
  UA = window.navigator.userAgent.toLowerCase();
}

const isDingtalk = dingtalkContainer();

function dingtalkContainer(){
  if (isWeex){
    if (env.appName === 'DingTalk' || env.appName === 'com.alibaba.android.rimet'){
      return true;
    }
    return false;
  } else {
    return UA && UA.indexOf('dingtalk') > -1;
  }
}

function webAndroid(){
  if (isWeb){
    return UA && UA.indexOf('android') > -1;
  }
  return null;
}

function webiOS(){
  if (isWeb){
    return UA && /iphone|ipad|ipod|ios/.test(UA);
  }
  return null;
}

function fetchVersion(){
  if (isWeb){
    let matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
    if (matches === null) {
        matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
    }
    let version = matches && matches[1];
    return version;
  } else {
    return env.appVersion;
  }
}

const isWebiOS = webiOS();
const isWebAndroid = webAndroid();
const version = fetchVersion();

export default {
  isDingtalk,
  isWeb,
  isWebiOS,
  isWebAndroid,
  isWeex,
  isWeexiOS,
  isWeexAndroid,
  bundleFrameworkType,
  bundleUrl,
  originalUrl,
  version
};
