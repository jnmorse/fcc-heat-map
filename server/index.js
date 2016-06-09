import express from 'express'
import React from 'react'
// import path from 'path'
import { renderToString } from 'react-dom/server'
import App from '../client/app'

const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.send(html(renderToString(<App />)))
})

const html = html => `
<!DOCTYPE html>
<html lang="en">
<head>
  <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
  
  <title>Heat Map</title>
</head>

<body>
  <div id="app">${html}</div>
  <script src="js/bundle.js"></script>
</body>
</html>
`

module.exports = app
