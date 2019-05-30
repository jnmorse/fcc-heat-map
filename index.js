require('babel-register')()

const PORT = process.env.PORT || 3000

const server = require('./server')

server.listen(PORT, err => {
  /* eslint-disable no-console */
  if (err) {
    return console.log(err.message)
  }

  return console.log(`Listening on port: ${PORT}`)
  /* eslint-enable */
})
