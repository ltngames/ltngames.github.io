const fs = require('fs/promises');
const axios = require('axios');

const ITCH_API_KEY = process.env.ITCH_KEY

if (ITCH_API_KEY == null) {
  console.error('Unable to find itch.io API key')
  process.exit()
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
    const paidPlugins = games.filter(p => p.min_price > 0 && p.published)

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

    // write to file
    const contents = JSON.stringify(paidPluginData, null, 2)
    const outputDir = `${__dirname}/src/_data/pluginData.json`
    await fs.writeFile(outputDir, contents, 'utf8')
  } catch (error) {
    console.error(error);
  }
})();
