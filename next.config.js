const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
// const withImages = require('next-images')

const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    disable: prod ? false : true,
    dest: 'public',
    runtimeCaching,
  },
})

// module.exports = withImages({
//   esModule: true,
// })