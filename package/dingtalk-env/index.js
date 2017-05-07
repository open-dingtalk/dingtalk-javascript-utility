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
      weexEnv.appName = env.appName;
    } else {
      // Vue Web
      const href = location.href;
      const tpl = url.parse(href,'dd_wx_tpl');
      weexEnv.dingtalk = {
        bundleUrl: tpl ? tpl : url.parse(href,'_wx_tpl'),
        originalUrl: href
      }
    }
  } else {
    // Rax Weex
    if (typeof callNative === 'function'){
      weexEnv.platform = navigator.platform;
      weexEnv.appName = navigator.appName;
    } else {
      // Rax Web
      weexEnv.platform = 'Web';
      const href = location.href;
      const tpl = url.parse(href,'dd_wx_tpl');
      weexEnv.dingtalk = {
        bundleUrl: tpl ? tpl : url.parse(href,'_wx_tpl'),
        originalUrl: href
      }
    }
    weexEnv.bundleFrameworkType = 'Rax';
  }
  return weexEnv;
}

const env = whatEnv();
const isiOS = env.platform === 'iOS';
const isAndroid = env.platform === 'Android';
const isWeb = env.platform === 'Web';
const isWeex = isiOS || isAndroid;
const { dingtalk, bundleFrameworkType } = env;
const { bundleUrl, originalUrl } = dingtalk;
const isDingtalk = dingtalkContainer();

function dingtalkContainer(){
  if (isWeex){
    return env.appName === 'DingTalk';
  } else {
    return /DingTalk/.test(navigator.userAgent)
  }
}

export default {
  isiOS,
  isAndroid,
  isDingtalk,
  isWeb,
  isWeex,
  bundleFrameworkType,
  bundleUrl,
  originalUrl
};
