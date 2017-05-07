import env from 'dingtalk-env';

const { bundleFrameworkType } = env;

export default function requireModule(name){
  if (bundleFrameworkType === 'Vue'){
    return weex.requireModule(name);
  } else {
    let moduleName = '@weex-module/' + name;
    return __weex_require__(moduleName);
  }
}
