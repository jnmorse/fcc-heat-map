import express from 'express'
import React from 'react'
// import path from 'path'
import { renderToString } from 'react-dom/server'
import App from '../client/app'
import axios from 'axios'

const app = express()
const API_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json'

app.use(express.static('public'))

app.use((req, res, next) => {
  axios.get(API_URL)
    .then(response => {
      req.data = response.data
      next()
    })
    .catch(error => next(error))
})

app.get('*', (req, res) => {
  res.send(html(renderToString(<App data={req.data} />), req.data))
})

const html = (html, state) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>Heat Map</title>

  <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
</head>

<body>
  <div id="app">${html}</div>
  <script>
    var INIT_STATE = ${JSON.stringify(state)}
  </script>
  <script src="js/bundle.js"></script>
</body>
</html>
`

module.exports = app
