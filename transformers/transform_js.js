const babel = require('babel-core');
const es2015Preset = require('babel-preset-es2015');
const reactPreset = require('babel-preset-react');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [es2015Preset, reactPreset, jestPreset],
        retainLines: true,
      }).code;
    }
    return src;
  }
};
