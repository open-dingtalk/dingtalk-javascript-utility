import { framework, isWeex } from '../util.js';

export default function requireModule(name){
  if (isWeex){
    if (framework === 'Vue'){
      return weex.requireModule(name);
    } else {
      let moduleName = '@weex-module/' + name;
      return __weex_require__(moduleName);
    }
  } else {
    if (framework === 'Vue'){
      return weex.requireModule(name);
    }
  }
}
