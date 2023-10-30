const axios = require('axios');
const cheerio = require('cheerio');

function objectFromTable(page, tableContainer) {
  const tableData = [];

  tableContainer.find('table tr').each(function (index, row) {
    const $row = page(row);
    const leftCell = $row.find('td').eq(0).text();
    const rightCell = $row.find('td').eq(1).text();

    tableData[leftCell] = rightCell;
  });
  return tableData;
}

async function scrapeItchProduct (productUrl) {
  try {
    const response = await axios.get(productUrl);
    const page = cheerio.load(response.data);
    const descriptionHtml = page('div.formatted_description').html();
    const screenshots = page('div.screenshot_list a').toArray();
    const screenshotImages = screenshots.map(screenshot => {
      return screenshot.attribs.href;
    })
    const metadata = objectFromTable(page, page('div.info_panel_wrapper table'));
    return {
      screenshotImages,
      descriptionHtml,
      metadata
    } 
  } catch (error) {
    console.error(`Failed to scrape itch.io product ${productUrl}`, error)
  }
}

async function itchProduct (productSlug, opts) {
  const productData = await scrapeItchProduct(`https://${opts.username}.itch.io/${productSlug}`);
  return productData;
}

module.exports = {
  itchProduct,
  async getDescription (productSlug, opts) {
    const productData = await itchProduct(productSlug, opts)
    return productData.descriptionHtml;
  },

  async getScreenshots (productSlug, opts) {
    const productData = await itchProduct(productSlug, opts)
    return productData.screenshotImages;
  },

  async getMetadata (productSlug, opts) {
    const productData = await itchProduct(productSlug, opts)
    return productData.metadata;
  }
}