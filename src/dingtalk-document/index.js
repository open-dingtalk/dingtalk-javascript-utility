import { framework, isWeex } from '../util.js';

function Document(){
  if ( isWeex && framework === 'Vue'){
    return weex.document;
  } else {
    return document;
  }
}

const doc = Document();

export default doc;
