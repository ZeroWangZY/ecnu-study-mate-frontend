import React, {Component} from 'react';
import TopBar from './common/TopBar';
import LeftMenu from './common/LeftMenu';
import {Route, Switch} from 'react-router-dom';
import Homework from './components/homework/Homework';
import Schedule from './components/schedule/Schedule';

class App extends Component {
  render () {
    return (
      <div className="App">
        <TopBar />
        <Switch>
          <Route exact path="/" component={Schedule} />
          <Route path="/homework" component={Homework} />
        </Switch>
        <LeftMenu />
      </div>
    );
  }
}

export default App;
