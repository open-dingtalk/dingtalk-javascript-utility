var path = require('path');

function absolute (str) {
  return path.resolve(__dirname, '..', str)
}

module.exports = {
  "dingtalk-querystring": absolute("package/dingtalk-querystring/index.js"),
  "dingtalk-url": absolute("package/dingtalk-url/index.js"),
  "dingtalk-env": absolute("package/dingtalk-env/index.js"),
  "dingtalk-version": absolute("package/dingtalk-version/index.js"),
  "dingtalk-timer": absolute("package/dingtalk-timer/index.js"),
  "dingtalk-require": absolute("package/dingtalk-require/index.js"),
  "dingtalk-document": absolute("package/dingtalk-document/index.js")
};
