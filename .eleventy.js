const siteData = require('./src/_data/config');

module.exports = function(config) {
  config.addPassthroughCopy('src/assets/')
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
}