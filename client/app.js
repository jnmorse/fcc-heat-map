import React from 'react'

export default class App extends React.Component {
  state = {
    value: 0
  }

  changeState(value) {
    this.setState({
      value: this.state.value + value
    })
  }

  render() {
    return (
      <div>
        <div>{'Hello World'}</div>
        <button onClick={() => this.changeState(1)}>{'Add'}</button>
        <span style={{padding: '0.5em'}}>{this.state.value}</span>
        <button onClick={() => this.changeState(-1)}>{'Minus'}</button>
      </div>
    )
  }
}
