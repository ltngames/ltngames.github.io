const siteData = require('./src/_data/config');
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('./plugins/plugin-toc/.eleventy.js')

module.exports = function (config) {
  const mdOptions = {
    html: true
  }
  config.setLibrary('md', markdownIt(mdOptions).use(markdownItAnchor))
  config.addPlugin(pluginTOC, {
    ul: true,
    wrapper: 'aside',
    wrapperClass: 'menu',
    tags: ['h1', 'h2', 'h3', 'h4']
  })
  
  config.addPairedShortcode('message', function (content, label = 'Note', type = 'is-dark') {
    return `
      <article class="message ${type}">
        <div class="message-header">
          <p>${label}</p>
        </div>
        <div class="message-body">
          ${content}
        </div>
      </article>
    `;
  });

  config.addFilter('tojson', function (content) {
    return JSON.stringify(content);
  });

  config.addPassthroughCopy('static/')
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
}