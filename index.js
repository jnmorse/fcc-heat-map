const PORT = process.env.PORT || 3000

const server = require('./build/server').default

server.listen(PORT, err => {
  /* eslint-disable no-console */
  if (err) {
    return console.log(err.message)
  }

  return console.log(`Listening on port: ${PORT}`)
  /* eslint-enable */
})
