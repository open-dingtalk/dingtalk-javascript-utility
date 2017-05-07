import env from 'dingtalk-env';

const { bundleFrameworkType, isWeex} = env;

function Document(){
  if ( isWeex && bundleFrameworkType === 'Vue'){
    return weex.document;
  } else {
    return document;
  }
}

const doc = Document();

export default doc;
