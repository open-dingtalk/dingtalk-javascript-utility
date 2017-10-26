import { framework, runtime } from '../util.js';
import url from '../dingtalk-url';
import { RUNTIME, FRAMEWORK } from './constants.js';

function dingtalkWebUrl(originalUrl){
  const tpl = url.parse(originalUrl,'dd_wx_tpl');
  const _wx_tpl = url.parse(originalUrl,'_wx_tpl');
  return {
    bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
    originalUrl
  }
}

function createContainerConfig(){
  let containerConfig = {}
  if (RUNTIME.WEB === runtime){
    containerConfig = dingtalkWebUrl(location.href);
  }
  if (RUNTIME.WEEX === runtime){
    if (FRAMEWORK.VUE === framework){
      const config = weex.config;
      containerConfig.bundleUrl = config.bundleUrl;
      containerConfig.originalUrl = config.originalUrl;
    }
    if (FRAMEWORK.RAX === framework){
      containerConfig.bundleUrl = __weex_options__.bundleUrl;
      containerConfig.originalUrl = __weex_options__.originalUrl;
    }
  }
  return containerConfig;
}

const containerConfig = createContainerConfig();

export default containerConfig;