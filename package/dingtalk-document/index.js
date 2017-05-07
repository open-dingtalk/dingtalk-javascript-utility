import env from 'dingtalk-env';

const { bundleFrameworkType } = env;

function Document(){
  if (bundleFrameworkType === 'Vue'){
    return weex.document;
  } else {
    return document;
  }
}

const doc = Document();

export default doc;
