'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../util.js');

function Document() {
  if (_util.isWeex && _util.framework === 'Vue') {
    return weex.document;
  } else {
    return document;
  }
}

var doc = Document();

exports.default = doc;
//# sourceMappingURL=index.js.map