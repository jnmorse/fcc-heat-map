import React from 'react'
import axios from 'axios'
import d3 from 'd3'


const cellHeight = (680 - 20) / 12

/**
 * Render the Chart
 *
 * @param  {object} data  The data to render the map
 * @return {Array}        Array of elements
 */
function renderChart({xScale, colorScale, tempatures}) {
  return tempatures.map(temp => (
    <rect
      key={JSON.stringify(temp)}
      x={xScale(new Date().setFullYear(temp.year))}
      y={20 + cellHeight * (temp.month - 1)}
      fill={colorScale(temp.temp)}
      width={5}
      stroke={'rgba(40, 20, 20, 0.15)'}
      strokeWidth={1}
      height={cellHeight}
    />
  ))
}

/**
 * Chart Component
 *
 * @class
 */
export default class Chart extends React.Component {
  state = {
    data: {
      xScale: null,
      colorScale: null,
      tempatures: []
    },
    error: false
  }

  /**
   * Get data and prepare scales
   *
   * @return {Promise} Promise to return setup data
   */
  setup() {
    return new Promise((resolve, reject) => {
      const request = axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json')

      request.catch(() => reject('There was a problem loading data'))

      request.then(response => {
        const { monthlyVariance, baseTemperature } = response.data

        const chartData = monthlyVariance.map(month => {
          return Object.assign({}, month, { temp: +baseTemperature + +month.variance })
        })

        // xScale using year
        const xScale = d3.time.scale()
          .domain(d3.extent(chartData, d => new Date().setFullYear(d.year)))
          .range([80, 1200])

        // Color scale using temp
        const colorScale = d3.scale.quantile()
          .domain(d3.extent(chartData, d => d.temp))
          .range([
            'hsl(0, 25%, 20%)',
            'hsl(0, 25%, 40%)',
            '#a2a2ca',
            '#a2caa2',
            '#cacaca',
            '#caa2a2',
            '#823232'
          ])

        const data = {
          tempatures: chartData,
          xScale,
          colorScale
        }

        resolve(data)
      })
    })
  }

  componentDidMount() {
    this.setup()
      .then(data => this.setState({ data }))
      .catch(error => this.setState({ error }))
  }

  componentDidUpdate() {
    if (this.state.data.xScale) {
      const xAxis = d3.svg.axis()
        .scale(this.state.data.xScale)
        .ticks(d3.time.years, 20)
        .orient('bottom')

      d3.select(this._xAxis).call(xAxis)
    }
  }

  render() {
    const months = [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    return (
      <figure className='chart'>
        {this.state.error && <div className='error'>{'There was a problem loading the data'}</div>}
        <figcaption style={{ textAlign: 'center' }}>
          <h1>
            <div>{'Monthly Global Land-Surface Temperature'}</div>
            <div>{'Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.'}</div>
          </h1>
          <p>
            {'Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.'}
          </p>
          <p>
            {'Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07'}
          </p>
        </figcaption>

        <svg width={1280} height={720}>
          <g>
            {renderChart(this.state.data)}
          </g>

          <g>
            {this.state.data.colorScale && <rect x={0} y={0} width={20} height={20} fill={this.state.data.colorScale(0)} />}
          </g>

          <g
            className='axis'
            ref={elem => { this._xAxis = elem }}
            transform='translate(0,680)'
          />

          <g>
            {months.map((month, index) => (
              <text
                key={month}
                x={10}
                y={20 + cellHeight * index}
                dy={cellHeight / 2}
              >
                {month}
              </text>
            ))}
          </g>
        </svg>
      </figure>
    )
  }
}
