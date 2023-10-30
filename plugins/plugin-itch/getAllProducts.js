const fs = require('fs/promises');
const axios = require('axios');

module.exports = async function getAllProducts(options) {
  if (process.env.ITCH_KEY == null || options.itchKey === null) {
    console.error('Unable to find itch.io API key')
    process.exit()
  }

  const ITCH_API_KEY = process.env.ITCH_KEY || options.itchKey

  try {
    const itchResponse = await axios.get('https://itch.io/api/1/key/my-games', {
      headers: {
        Authorization: `Bearer ${ITCH_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    let games = itchResponse.data.games

    if (options.filter) {
      games = games.filter(options.filter)
    }

    const productsData = games.map(product => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })

      let minPrice = product.min_price
      let saleRate = null
      const digits = minPrice.toString().length

      if (digits <= 3) {
        const priceArr = String(minPrice).match(/\d/g)
        priceArr.splice(1, 0, '.')
        minPrice = priceArr.toString().replace(/[,]/g, '')
      }

      const formattedMinPrice = formatter.format(minPrice)

      if (product.sale) {
        saleRate = product.sale.rate
      }

      return {
        title: product.title,
        id: product.id,
        thumbnail: product.cover_url,
        link: product.url,
        slug: product.url.split('/').pop(),
        shortText: product.short_text,
        price: formattedMinPrice,
        salePrice: minPrice - (minPrice * saleRate / 100).toFixed(2),
        isPublished: product.published,
        publishedAt: product.published_at,
        isPaid: minPrice > 0,
        purchases: product.purchases_count,
        downloads: product.downloads_count,
        views: product.views_count,
        type: product.type,
        classification: product.classification,
        isSale: product.sale,
        saleRate,
      }
    })

    if (options.rawData) {
      return games
    }

    return productsData
  } catch (error) {
    console.error(error);
  }
}
