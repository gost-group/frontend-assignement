import React, { Component } from 'react';
import SuperChart from 'modules/superChart/components';

class App extends Component {

  state={
    w:600,
    h:400,
    scale: 1
  }

  handleKeyDown = e => {
    if (e.key==="Enter")
      this.setState({
        scale:(this.state.scale===1?1.5:1)
      });
  }

  setFocus = () => {
    this.divChart.focus();
  }

  componentDidMount = () => {
    this.divChart.focus();
  }

  render() {
    const {w,h,scale} = this.state;
    return (
      <div  className="App" 
            onKeyDown={this.handleKeyDown} 
            tabIndex="0"
            ref={(input)=>{this.divChart=input}}
            onBlur={this.setFocus}>
        <SuperChart width={w*scale} height={h*scale}/>
      </div>
    );
  }
}

export default App;
