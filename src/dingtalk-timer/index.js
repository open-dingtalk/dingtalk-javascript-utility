import requireModule from '../dingtalk-require';
import document from '../dingtalk-document';
import { isWeex } from '../util.js';

const timer = requireModule('timer');

function setTimeout(handler,time){
  if (isWeex){
    timer.setTimeout(handler,time);
    return document.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setTimeout(handler,time);
  }
}

function clearTimeout(n){
  if (isWeex){
    timer.clearTimeout(n);
  } else {
    window.clearTimeout(n);
  }
}

function setInterval(handler,time){
  if (isWeex){
    timer.setInterval(handler,time);
    return document.taskCenter.callbackManager.lastCallbackId.toString();
  } else {
    return window.setInterval(handler,time);
  }
}

function clearInterva(n){
  if (isWeex){
    timer.clearInterva(n);
  } else {
    window.clearInterva(n);
  }
}

export default {
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterva
};
