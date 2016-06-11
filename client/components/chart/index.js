import React from 'react'
import d3 from 'd3'
import Cell from './cell'
import LedgendLabel from './legend-label'

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
        onMouseOut={() => hideTooltip()}
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
  state = {
    data: {
      xScale: null,
      colorScale: null,
      tempatures: []
    },
    error: false
  }

  static propTypes = {
    data: React.PropTypes.shape({
      monthlyVariance: React.PropTypes.array,
      baseTemperature: React.PropTypes.number
    })
  }

  constructor(props) {
    super(props)

    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
  }

  componentWillMount() {
    const { monthlyVariance, baseTemperature } = this.props.data

    const chartData = monthlyVariance.map(month => {
      return Object.assign({}, month, { temp: baseTemperature + +month.variance })
    })

    const xScale = d3.time.scale()
      .domain(d3.extent(chartData, d => new Date().setFullYear(d.year)))
      .range([80, 1200])

    const colorScale = d3.scale.quantile()
      .domain(d3.extent(chartData, d => d.temp))
      .range([
        'hsl(200, 100%, 50%)',
        'hsl(200, 100%, 70%)',
        'hsl(230, 30%, 50%)',
        'hsl(230, 30%, 70%)',
        'hsl(122, 30%, 50%)',
        'hsl(122, 30%, 70%)',
        'hsl(340, 30%, 50%)',
        'hsl(340, 100%, 50%)',
        'hsl(0, 100%, 50%)',
        'hsl(0, 100%, 70%)',
        'hsl(160, 60%, 75%)'
      ])

    const data = {
      tempatures: chartData,
      xScale,
      colorScale
    }

    this.setState({ data })
  }

  addRectNode({x, y, width, height}) {
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

  addTextNode({x, y}, value) {
    const textNode = document.createElementNS(xmlns, 'text')
    value = document.createTextNode(value)

    textNode.setAttributeNS(null, 'x', x + 10)
    textNode.setAttributeNS(null, 'y', y + 20)
    textNode.setAttributeNS(null, 'fill', 'white')
    textNode.appendChild(value)

    return textNode
  }

  showTooltip({ clientX, clientY, target}) {
    const year = target.getAttribute('data-year'),
      variance = target.getAttribute('data-variance'),
      temp = parseFloat(target.getAttribute('data-temp')).toFixed(2) + ' C'

    if (year) {
      this._tooltip = document.createElementNS(xmlns, 'g')
      const offset = this._svg.getBoundingClientRect()

      const pos = {
        x: clientX - offset.left - 30,
        y: clientY - offset.top + 30
      }

      this._tooltip.appendChild(
        this.addRectNode({...pos, width: 110, height: 75})
      )

      this._tooltip.appendChild(
        this.addTextNode(pos, `Year: ${year}`)
      )

      this._tooltip.appendChild(
        this.addTextNode({ ...pos, y: pos.y + 20 }, `variance ${variance}`)
      )

      this._tooltip.appendChild(
        this.addTextNode({ ...pos, y: pos.y + 40 }, `Temp: ${temp}`)
      )

      this._svg.appendChild(this._tooltip)

      // setTimeout(() => this._svg.removeChild(tooltip), 1000)
    }
  }

  hideTooltip() {
    if (this._tooltip) {
      this._svg.removeChild(this._tooltip)
      this._tooltip = null
    }
  }

  componentDidMount() {
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

    const ledgend = () => {
      const { colorScale } = this.state.data

      if (colorScale) {
        return (
          <g transform='translate(900,670)'>
            <text x={0} y={15}>{'Ledgend'}</text>
            <LedgendLabel x={60} y={0} color={colorScale(0)} label='0' />
            <LedgendLabel x={80} y={0} color={colorScale(3)} label='3' />
            <LedgendLabel x={100} y={0} color={colorScale(4)} label='4' />
            <LedgendLabel x={120} y={0} color={colorScale(6)} label='6' />
            <LedgendLabel x={140} y={0} color={colorScale(7)} label='7' />
            <LedgendLabel x={160} y={0} color={colorScale(8)} label='8' />
            <LedgendLabel x={180} y={0} color={colorScale(9)} label='9' />
            <LedgendLabel x={200} y={0} color={colorScale(10)} label='10' />
            <LedgendLabel x={220} y={0} color={colorScale(11)} label='11' />
            <LedgendLabel x={240} y={0} color={colorScale(12)} label='12' />
            <LedgendLabel x={260} y={0} color={colorScale(13)} label='13' />
          </g>
        )
      }

      return null
    }

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

        <svg
          width={1280}
          height={720}
          ref={svg => { this._svg = svg }}
          style={{
            display: 'block',
            margin: 'auto'
          }}
        >
          <g>
            {renderChart(this.state.data, this.showTooltip, this.hideTooltip)}
          </g>

          <g>
            {ledgend()}
          </g>

          <g
            className='axis'
            ref={elem => { this._xAxis = elem }}
            transform='translate(0,640)'
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
