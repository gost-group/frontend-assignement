import React, { Component } from 'react'
import SuperChart from 'modules/superChart/components'

class App extends Component {

  state = {
    width: 600,
    height: 400,
    scale: 1
  }

  componentDidMount() {
    document.body.onkeydown = e => {
      if (e.key === 'Enter') {
        this.setState({
          scale: this.state.scale === 1 ? 1.5 : 1
        })
      }
    }
  }

  render() {
    const { width, height, scale } = this.state

    return (
      <div className='App'>
        <SuperChart width={width} height={height} scale={scale} />
      </div>
    )
  }
}

export default App
