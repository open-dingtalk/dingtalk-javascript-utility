if (typeof weex === 'undefined'){
  /*不是weex环境（包括weex下的Web）构建一个假的weex对象做欺骗*/
  window.weex = {};
  weex.config = {};
  weex.config.env = {};
  let env = weex.config.env;
  env.platform = 'NOTWeexNative&&WeexWeb';
}
const env = weex.config.env;

export const isiOS = env.platform === 'iOS';
export const isAndroid = env.platform === 'Android';
export const isDingtalk = env.appName === 'DingTalk';
export const isWeexWeb = env.platform === 'Web';
export const isWeexNative = isiOS || isAndroid;
export const isWeb = env.platform === 'NOTWeexNative&&WeexWeb';
