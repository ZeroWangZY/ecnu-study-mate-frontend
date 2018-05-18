import React, { Component } from 'react';
import TopBar from './common/TopBar';
import Dnd from './common/dnd';
class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <Dnd />
      </div>
    );
  }
}

export default App;
