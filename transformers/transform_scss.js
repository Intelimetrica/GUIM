const postcss = require('postcss-js');

module.exports = {
  process(src, filename) {
    return postcss.objectify(src);
  }
};
