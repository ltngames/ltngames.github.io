const fs = require('fs/promises');
const axios = require('axios');
const itchScraper = require('./plugins/plugin-itch/.eleventy.js');

const ITCH_API_KEY = process.env.ITCH_KEY

if (ITCH_API_KEY == null) {
  console.error('Unable to find itch.io API key')
  process.exit()
}

async function writePluginsData (data, isFree = false) {
  const contents = JSON.stringify(data, null, 2)
  let outDir = ''
  if (isFree) {
    outDir = `${__dirname}/src/_data/freePluginData.json`
  } else {
    outDir = `${__dirname}/src/_data/pluginData.json`
  }
  await fs.writeFile(outDir, contents, 'utf8')
}

;(async () => {
  try {
    const allProducts = await itchScraper.retrieveUserProducts({
      itchKey: ITCH_API_KEY,
      username: 'ltngames',
      filter: product => {
        return product.published
      }
    });

    const freePluginData = allProducts.filter(product => {
      return !product.isPaid && product.classification === 'tool'
    })

    const paidPluginData = allProducts.filter(product => {
      return product.isPaid && product.classification === 'tool'
    })

    const games = allProducts.map(product => {
      return product.classification === 'game'
    })

    // write to file
    await writePluginsData(freePluginData, true)
    await writePluginsData(paidPluginData)
  } catch (error) {
    console.error(error);
  }
})();
