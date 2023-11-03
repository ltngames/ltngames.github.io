const { DateTime } = require('luxon')

module.exports = {
  layout: 'post.html',
  tags: ['post'],
  author: 'ltngames',
  eleventyComputed: {
    dateString: ({page}) => {
      return DateTime.fromJSDate(page.date, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL)
    }
  },
}