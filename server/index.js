import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import axios from 'axios'
import compression from 'compression'

import App from '../client/app'

const html = (renderedComponent, state) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Monthly Global Land-Surface Temperature">

  <title>Heat Map</title>

  <link rel="stylesheet" href="styles/bundle.css" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css">
</head>

<body>
  <div id="app">${renderedComponent}</div>
  <script>
    var INIT_STATE = ${JSON.stringify(state)}
  </script>
  <script src="js/bundle.js"></script>
</body>
</html>
`

const expressApp = express()

const API_URL =
  'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json'

expressApp.use(compression())
expressApp.use(express.static('build/client'))

expressApp.use((req, res, next) => {
  axios
    .get(API_URL)
    .then(response => {
      req.data = response.data
      next()
    })
    .catch(error => next(error))
})

expressApp.get('/robots.txt', (req, res) => {
  res.send('')
})

expressApp.get('*', (req, res) => {
  res.send(html(renderToString(<App data={req.data} />), req.data))
})

export default expressApp
