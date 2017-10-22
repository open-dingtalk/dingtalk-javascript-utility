'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dingtalkEnv = require('../dingtalk-env');

var _dingtalkEnv2 = _interopRequireDefault(_dingtalkEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bundleFrameworkType = _dingtalkEnv2.default.bundleFrameworkType,
    isWeex = _dingtalkEnv2.default.isWeex;


function Document() {
  if (isWeex && bundleFrameworkType === 'Vue') {
    return weex.document;
  } else {
    return document;
  }
}

var doc = Document();

exports.default = doc;
//# sourceMappingURL=index.js.map