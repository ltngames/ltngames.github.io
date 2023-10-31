const fs = require('fs/promises');
const axios = require('axios');
const itchScraper = require('./plugins/plugin-itch/.eleventy.js');

const ITCH_API_KEY = process.env.ITCH_KEY

if (ITCH_API_KEY == null) {
  console.error('Unable to find itch.io API key')
  process.exit(1)
}

async function writeJson (data, filename) {
  const contents = JSON.stringify(data, null, 2)
  let outDir = ''
    outDir = `${__dirname}/src/_data/${filename}.json`
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

    const games = allProducts.filter(product => {
      return product.classification === 'game'
    })

    const freePluginData = allProducts.filter(product => {
      return !product.isPaid && product.classification === 'tool'
    })

    const paidPluginData = allProducts.filter(product => {
      return product.isPaid && product.classification === 'tool'
    })

    // write to file
    await writeJson(freePluginData, 'freePluginData')
    await writeJson(paidPluginData, 'pluginData')
    await writeJson(games, 'gameData')
  } catch (error) {
    console.error(error);
  }
})();
