var path = require('path');

function absolute (str) {
  return path.resolve(__dirname, '..', str)
}

module.exports = {
  "querystring": absolute("package/querystring/index.js"),
  "url": absolute("package/URL/index.js"),
  "env": absolute("package/env/index.js")
};
