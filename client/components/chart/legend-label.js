import React from 'react'
import Cell from './cell'

function LedgendLabel({x, y, color, label}) {
  return (
    <g className='ledgend-key'>
      <Cell x={x} y={y} width={20} height={20} fill={color} />
      <text x={x} y={y} dx={10} dy={35} textAnchor='middle'>{label}</text>
    </g>
  )
}

LedgendLabel.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired
}

export default LedgendLabel
