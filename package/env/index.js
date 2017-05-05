function whatEnv(){
  let weexEnv = {};
  if (typeof weex !== 'undefined'){
    weexEnv.platform = weex.config.env.platform;
    weexEnv.bundleFrameworkType = 'Vue';
    weexEnv.appName = weex.config.env.appName;
  } else {
    // Rax Weex
    if (typeof callNative === 'function'){
      weexEnv.platform = navigator.platform;
      weexEnv.appName = navigator.appName;
    } else {
      // Rax Web
      weexEnv.platform = 'Web';
    }
    weexEnv.bundleFrameworkType = 'Rax';
  }
  return weexEnv;
}

const env = whatEnv();
const isiOS = env.platform === 'iOS';
const isAndroid = env.platform === 'Android';
const isDingtalk = env.appName === 'DingTalk';
const isWeexWeb = env.platform === 'Web';
const isWeexNative = isiOS || isAndroid;
const bundleFrameworkType = env.bundleFrameworkType;

export default {
  isiOS,
  isAndroid,
  isDingtalk,
  isWeexWeb,
  isWeexNative,
  bundleFrameworkType
};
