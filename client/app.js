import React from 'react'
import PropTypes from 'prop-types'

import Chart from './components/chart'

function App({ data }) {
  return (
    <div>
      <Chart data={data} />
    </div>
  )
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  data: PropTypes.object.isRequired
}
/* eslint-enable */

export default App
