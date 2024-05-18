const path = require('path')
module.exports = {
  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us', 'fr-FR'],
  },
  localePath: path.resolve('./public/locales'),
}
