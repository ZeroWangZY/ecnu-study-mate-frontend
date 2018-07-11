import React, {Component} from 'react';
import TopBar from './common/TopBar';
import Dnd from './common/dnd';
import LeftMenu from './common/LeftMenu';

class App extends Component {
  render () {
    return (
      <div className="App">
        <TopBar />
        <Dnd />
        <LeftMenu />
      </div>
    );
  }
}

export default App;
