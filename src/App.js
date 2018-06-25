import React, { Component } from 'react';
import SuperChart from 'modules/superChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SuperChart width={600} height={400} />
      </div>
    );
  }
}

export default App;
