/* global INIT_STATE */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'
import './styles/index.scss'

const mountPoint = document.getElementById('app')

ReactDOM.render(
  <AppContainer>
    <App data={INIT_STATE} />
  </AppContainer>,
  mountPoint
)

if (module.hot) {
  module.hot.accept('./app', () => {
    /*
     * If you use Webpack 2 in ES modules mode, you can
     * use <App /> here rather than require() a <NextApp />.
     */
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
      mountPoint
    )
  })
}
