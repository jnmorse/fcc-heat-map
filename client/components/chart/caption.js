import React from 'react'

const Caption = () => (
  <figcaption style={{ textAlign: 'center' }}>
    <h1>
      <div>{'Monthly Global Land-Surface Temperature'}</div>
      <div>
        {
          'Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.'
        }
      </div>
    </h1>
    <p>
      {
        'Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.'
      }
    </p>
    <p>{'Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07'}</p>
  </figcaption>
)

export default Caption
