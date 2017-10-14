import dingtalk from 'dingtalk-javascript-sdk';
import env from '../../../src/package/dingtalk-env';
import timer from '../../../src/package/dingtalk-timer';

/*
  实验私有模块，同步版会影响性能

  此版本会给所有的api包一层ready函数
*/

const { setTimeout, clearTimeout } = timer;

function apisync(){
  let container;
  let _timeoutStatu = false;
  let _apis;
  while(true){
    var apis = null;
    let timeoutStatu = false;
    let once = true;
    let timeout;
    if (once){
      once = false;
      dingtalk.ready(function(){
        apis = dingtalk.apis;
      });
      timeout = setTimeout(function(){
        timeoutStatu = true;
        clearTimeout(timeout);
      },1000);
    }
    if (timeoutStatu){
      _timeoutStatu = true;
      throw new Error('sync apis timeout 1000ms');
      break;
    }
    if (apis){
      _apis = apis;
      clearTimeout(timeout);
      break;
    }
  }
  if (!_timeoutStatu && _apis){
    container = reloadApis(apis);
  }
  return container;
}

function reloadApis(apis){
  let container = Object.create(null);
  for (let spaceName in apis){
    let api = apis[spaceName];
    if (typeof api === 'function'){
      container[spaceName] = api;
    }
    if (typeof api === 'object' && api !== null){
      container[spaceName] = recursiveApis(spaceName,api,Object.create(null));
    }
  }
  return container;
}

function recursiveApis(spaceName,api,c,action){
  let node = Object.keys(api);
  let i = 0;
  let j = node.length;
  for(;i<j;i++){
    let apiName = node[i];
    if (typeof api[apiName] === 'function'){
      c[apiName] = function(conf){
        dingtalk.ready(function(){
          const dd = dingtalk.apis;
          dd[spaceName][action][apiName](conf);
        });
      }
      continue;
    }
    if (typeof api[apiName] === 'object' && api[apiName] !== null){
      c[apiName] = recursiveApis(spaceName, api[apiName],Object.create(null),apiName);
    }
  }
  return c;
}

let initStatus = true;
let Apis = {};
if (initStatus){
  initStatus = false;
  Apis = apisync();
}

export default Apis;
