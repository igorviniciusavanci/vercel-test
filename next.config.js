const withPWA = require('next-pwa')
// const withImages = require('next-images')

const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
})

// module.exports = withImages({
//   esModule: true,
// })