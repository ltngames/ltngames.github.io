const { itchProduct, getDescription, getScreenshots, getMetadata } = require('./ItchScraper.js')
const getAllProducts = require('./getAllProducts.js')
const fs = require('fs/promises')

module.exports = {
  use (eleventyConfig, globalOpts) {
    eleventyConfig.namespace(globalOpts, () => {
      eleventyConfig.addAsyncFilter('itchDescription', async function (productSlug, localOpts) {
        localOpts = Object.assign({}, globalOpts, localOpts)
        const html = await getDescription(productSlug, localOpts)
        return html
      })

      eleventyConfig.addAsyncFilter('itchScreenshots', async function (productSlug, localOpts) {
        localOpts = Object.assign({}, globalOpts, localOpts)
        const urls = await getScreenshots(productSlug, localOpts)
        return urls
      })
    })

    eleventyConfig.addAsyncFilter('itchMetadata', async function (productSlug, localOpts) {
      localOpts = Object.assign({}, globalOpts, localOpts)
      const metaData = await getMetadata(productSlug, localOpts)
      return metaData
    })
  },

  async retrieveUserProducts (options = { delay: 200 }) {
    const products = await getAllProducts(options);
    const data = [];

    for (const product of products) {
      if (product.isPublished === false) {
        continue;
      }
      const productSlug = product.slug;
      const itchData = await new Promise(resolve => {
        setTimeout(() => {
          resolve(itchProduct(productSlug, options));
        }, options.delay);
      })

      const metadata = itchData.metadata;
      const pageContent = itchData.descriptionHtml;
      const screenshots = itchProduct.screenshotImages;

      data.push({
        metadata,
        pageContent,
        screenshots,
        ...product
      })
    }

    return data;
  },

  async writeProductData (options) {
    const data = await this.retrieveUserProducts(options)
    const contents = JSON.stringify(data, null, 2)
    const cwd = process.cwd()
    const dataDir = options.dir || './src/_data'
    let outDir = `${cwd}/${dataDir}/productPageData.json`
    await fs.writeFile(outDir, contents, 'utf8')
  }
}
