if (typeof weex === 'undefined'){
  /*不是weex环境（包括weex下的Web）构建一个假的weex对象做欺骗*/
  window.weex = {};
  weex.config = {};
  weex.config.env = {};
  let env = weex.config.env;
  env.platform = 'NOTWeexNative&&WeexWeb';
}
const env = weex.config.env;

const isiOS = env.platform === 'iOS';
const isAndroid = env.platform === 'Android';
const isDingtalk = env.appName === 'DingTalk';
const isWeexWeb = env.platform === 'Web';
const isWeexNative = isiOS || isAndroid;
const isWeb = env.platform === 'NOTWeexNative&&WeexWeb';

export default {
  isiOS,
  isAndroid,
  isDingtalk,
  isWeexWeb,
  isWeexNative,
  isWeb
};
