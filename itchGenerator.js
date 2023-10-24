const fs = require('fs/promises');
const axios = require('axios');

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
    const itchResponse = await axios.get('https://itch.io/api/1/key/my-games', {
      headers: {
        Authorization: `Bearer ${ITCH_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    const games = itchResponse.data.games
    const freePlugins = games.filter(p => p.min_price <= 0 && p.published && p.classification === 'tool')
    const paidPlugins = games.filter(p => p.min_price > 0 && p.published && p.classification === 'tool')

    const paidPluginData = paidPlugins.map(plugin => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })

      let minPrice = plugin.min_price
      let saleRate = null
      const digits = minPrice.toString().length

      if (digits <= 3) {
        const priceArr = String(minPrice).match(/\d/g)
        priceArr.splice(1, 0, '.')
        minPrice = priceArr.toString().replace(/[,]/g, '')
      }

      const formattedMinPrice = formatter.format(minPrice)

      if (plugin.sale) {
        this.isSale = true
        saleRate = plugin.sale.rate
      }

      return {
        title: plugin.title,
        image: plugin.cover_url,
        link: plugin.url,
        description: plugin.short_text,
        price: formattedMinPrice,
        salePrice: minPrice - (minPrice * saleRate / 100).toFixed(2),
        saleRate
      }
    })

    const freePluginData = freePlugins.map(plugin => {
      return {
        title: plugin.title,
        image: plugin.cover_url,
        link: plugin.url,
        description: plugin.short_text
      }
    })

    // write to file
    await writePluginsData(freePluginData, true)
    await writePluginsData(paidPluginData)
  } catch (error) {
    console.error(error);
  }
})();
