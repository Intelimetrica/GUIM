module.exports = {
  verbose: true,
  transform: {
    "\\.js$":   "./transformers/transform_js.js",
    "\\.*":     "./transformers/transform_dummy.js"
  }
};
