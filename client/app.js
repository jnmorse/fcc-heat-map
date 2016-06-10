import React from 'react'
import Chart from './components/chart'

export default function App({ data }) {
  return (
    <div>
      <Chart data={data} />
    </div>
  )
}

/* eslint-disable react/forbid-prop-types */
App.propTypes = {
  data: React.PropTypes.object
}
/* eslint-enable */
