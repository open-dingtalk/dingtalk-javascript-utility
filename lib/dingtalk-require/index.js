'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requireModule;

var _util = require('../util.js');

function requireModule(name) {
  if (_util.isWeex) {
    if (_util.framework === 'Vue') {
      return weex.requireModule(name);
    } else {
      var moduleName = '@weex-module/' + name;
      return __weex_require__(moduleName);
    }
  } else {
    if (_util.framework === 'Vue') {
      return weex.requireModule(name);
    }
  }
}
//# sourceMappingURL=index.js.map