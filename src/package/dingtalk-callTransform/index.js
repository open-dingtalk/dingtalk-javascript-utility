
let dingtalkSDK;

function run(fn){
  dingtalkSDK.ready(() => {
    fn(dingtalkSDK.apis);
  });
}

function callTransform(names, opt = {}){
  return new Promise((resolve, reject) => {
    run(apis => {
      const seq = names.split('.');
      let func = apis;
      seq.forEach(next => func = func[next]);
      if (typeof func === 'function'){
        opt.onSuccess = (data) => resolve(data);
        opt.onFail = (err) => reject(err);
        func(opt);
      } else {
        throw new Error('Not Found');
      }
    });
  });
}

function setCallTransformSource(dingtalk){
  dingtalkSDK = dingtalk || {};
}

export default {
  callTransform,
  setCallTransformSource
};