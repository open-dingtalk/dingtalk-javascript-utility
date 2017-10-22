'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requireModule;

var _dingtalkEnv = require('../dingtalk-env');

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bundleFrameworkType = _dingtalkEnv2.default.bundleFrameworkType,
    isWeex = _dingtalkEnv2.default.isWeex;
function requireModule(name) {
  if (isWeex) {
    if (bundleFrameworkType === 'Vue') {
      return weex.requireModule(name);
    } else {
      var moduleName = '@weex-module/' + name;
      return __weex_require__(moduleName);
    }
  } else {
    if (bundleFrameworkType === 'Vue') {
      return weex.requireModule(name);
    }
  }
}
//# sourceMappingURL=index.js.map