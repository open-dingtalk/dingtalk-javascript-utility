import env from 'dingtalk-env';

const { bundleFrameworkType,isWeex } = env;

export default function requireModule(name){
  if (isWeex){
    if (bundleFrameworkType === 'Vue'){
      return weex.requireModule(name);
    } else {
      let moduleName = '@weex-module/' + name;
      return __weex_require__(moduleName);
    }
  } else {
    if (bundleFrameworkType === 'Vue'){
      return weex.requireModule(name);
    }
  }
}
