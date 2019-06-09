/* eslint-disable class-methods-use-this */
import React from 'react'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { axisBottom } from 'd3-axis'
import { scaleQuantile, scaleTime } from 'd3-scale'
import { extent } from 'd3-array'

import Cell from './cell'
import LedgendLabel from './legend-label'
import Caption from './caption'

const cellHeight = (640 - 20) / 12
const xmlns = 'http://www.w3.org/2000/svg'

/**
 * Render the Chart
 *
 * @param  {object} data  The data to render the map
 * @return {Array}        Array of elements
 */
function renderChart(data, tooltipHandler, hideTooltip) {
  const { xScale, colorScale, tempatures } = data
  return tempatures.map(d => {
    return (
      <Cell
        key={JSON.stringify(d)}
        x={xScale(new Date().setFullYear(d.year))}
        y={20 + cellHeight * (d.month - 1)}
        data-temp={d.temp}
        data-variance={d.variance}
        data-year={d.year}
        onMouseOver={event => tooltipHandler(event)}
        onFocus={event => tooltipHandler(event)}
        onMouseOut={() => hideTooltip()}
        onBlur={() => hideTooltip()}
        fill={colorScale(d.temp)}
        width={5}
        height={cellHeight}
      />
    )
  })
}

/**
 * Chart Component
 *
 * @class
 */
export default class Chart extends React.Component {
  static get propTypes() {
    return {
      data: PropTypes.shape({
        monthlyVariance: PropTypes.array,
        baseTemperature: PropTypes.number
      }).isRequired
    }
  }

  state = {
    data: {
      xScale: null,
      colorScale: null,
      tempatures: []
    },
    error: false
  }

  componentWillMount() {
    const {
      data: { monthlyVariance, baseTemperature }
    } = this.props

    const chartData = monthlyVariance.map(month => {
      return { ...month, temp: baseTemperature + +month.variance }
    })

    const xScale = scaleTime()
      .domain(extent(chartData, d => new Date().setFullYear(d.year)))
      .range([80, 1200])

    const colorScale = scaleQuantile()
      .domain(extent(chartData, d => d.temp))
      .range([
        'hsl(200, 100%, 30%)',
        'hsl(200, 90%, 40%)',
        'hsl(200, 80%, 50%)',
        'hsl(200, 70%, 60%)',
        'hsl(200, 60%, 70%)',
        'hsl(200, 50%, 80%)',
        'hsl(0, 60%, 70%)',
        'hsl(0, 70%, 60%)',
        'hsl(0, 80%, 50%)',
        'hsl(0, 90%, 40%)',
        'hsl(0, 100%, 30%)'
      ])

    const data = {
      tempatures: chartData,
      xScale,
      colorScale
    }

    this.setState({ data })
  }

  getCursorPos({ x, y }) {
    const pt = this.svg.createSVGPoint()
    pt.x = x
    pt.y = y

    return pt.matrixTransform(this.svg.getScreenCTM().inverse())
  }

  addTextNode({ x, y }, value) {
    const textNode = document.createElementNS(xmlns, 'text')
    const thisValue = document.createTextNode(value)

    textNode.setAttributeNS(null, 'x', x + 10)
    textNode.setAttributeNS(null, 'y', y + 20)
    textNode.setAttributeNS(null, 'fill', 'white')
    textNode.appendChild(thisValue)

    return textNode
  }

  addRectNode({ x, y, width, height }) {
    const rect = document.createElementNS(xmlns, 'rect')
    rect.setAttributeNS(null, 'x', x)
    rect.setAttributeNS(null, 'rx', 10)
    rect.setAttributeNS(null, 'y', y)
    rect.setAttributeNS(null, 'ry', 10)
    rect.setAttributeNS(null, 'width', width)
    rect.setAttributeNS(null, 'height', height)
    rect.setAttributeNS(null, 'fill', 'rgba(20, 20, 20, 0.8)')

    return rect
  }

  showTooltip({ clientX, clientY, target }) {
    const year = target.getAttribute('data-year')
    const variance = target.getAttribute('data-variance')
    const temp = `${parseFloat(target.getAttribute('data-temp')).toFixed(2)} C`

    if (year) {
      this.tooltip = document.createElementNS(xmlns, 'g')

      const cursor = this.getCursorPos({ x: clientX, y: clientY })
      const pos = { x: cursor.x - 55, y: cursor.y + 15 }

      this.tooltip.appendChild(
        this.addRectNode({ ...pos, width: 110, height: 75 })
      )

      this.tooltip.appendChild(this.addTextNode(pos, `Year: ${year}`))

      this.tooltip.appendChild(
        this.addTextNode({ ...pos, y: pos.y + 20 }, `Variance ${variance}`)
      )

      this.tooltip.appendChild(
        this.addTextNode({ ...pos, y: pos.y + 40 }, `Temp: ${temp}`)
      )

      this.svg.appendChild(this.tooltip)
    }
  }

  hideTooltip() {
    if (this.tooltip) {
      this.svg.removeChild(this.tooltip)
      this.tooltip = null
    }
  }

  componentDidMount() {
    const {
      data: { xScale }
    } = this.state

    if (xScale) {
      const xAxis = axisBottom(xScale)

      select(this.xAxis).call(xAxis)
    }
  }

  renderMonths() {
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

    return months.map((month, index) => (
      <text key={month} x={10} y={20 + cellHeight * index} dy={cellHeight / 2}>
        {month}
      </text>
    ))
  }

  legend = () => {
    const {
      data: { colorScale }
    } = this.state
    if (colorScale) {
      return (
        <g transform="translate(900,670)">
          <text x={0} y={15}>
            {'Ledgend'}
          </text>
          <LedgendLabel x={60} y={0} color={colorScale(0)} label="0" />
          <LedgendLabel x={80} y={0} color={colorScale(3)} label="3" />
          <LedgendLabel x={100} y={0} color={colorScale(4)} label="4" />
          <LedgendLabel x={120} y={0} color={colorScale(6)} label="6" />
          <LedgendLabel x={140} y={0} color={colorScale(7)} label="7" />
          <LedgendLabel x={160} y={0} color={colorScale(8)} label="8" />
          <LedgendLabel x={180} y={0} color={colorScale(9)} label="9" />
          <LedgendLabel x={200} y={0} color={colorScale(10)} label="10" />
          <LedgendLabel x={220} y={0} color={colorScale(11)} label="11" />
          <LedgendLabel x={240} y={0} color={colorScale(12)} label="12" />
          <LedgendLabel x={260} y={0} color={colorScale(13)} label="13" />
        </g>
      )
    }

    return null
  }

  render() {
    const { data, error } = this.state

    return (
      <figure className="chart">
        {error && (
          <div className="error">{'There was a problem loading the data'}</div>
        )}

        <Caption />

        <svg
          width={1280}
          height={720}
          viewBox="0,0,1280,720"
          ref={svg => {
            this.svg = svg
          }}
          style={{
            display: 'block',
            margin: 'auto'
          }}
        >
          <g>
            {renderChart(
              data,
              event => this.showTooltip(event),
              event => this.hideTooltip(event)
            )}
          </g>

          <g>{this.legend()}</g>

          <g
            className="axis"
            ref={elem => {
              this.xAxis = elem
            }}
            transform="translate(0,640)"
          />

          <g>{this.renderMonths()}</g>
        </svg>
      </figure>
    )
  }
}
