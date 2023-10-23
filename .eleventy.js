const siteData = require('./src/_data/config');
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('./plugins/plugin-toc/.eleventy.js')

module.exports = function(config) {
  config.setLibrary('md', markdownIt().use(markdownItAnchor))
  config.addPlugin(pluginTOC, {
    ul: true,
    wrapper: 'aside',
    wrapperClass: 'menu',
    tags: ['h1', 'h2', 'h3', 'h4']
  })
  config.addPassthroughCopy('src/assets/')
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
}