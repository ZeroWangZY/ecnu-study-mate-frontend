import React, { Component } from 'react';
import TopBar from './common/TopBar';
import LeftMenu from './common/LeftMenu';
import { Route, Switch } from 'react-router-dom';
import Homework from './components/homework/Homework';
import Schedule from './components/schedule/Schedule';
import Message from './components/message/Message';
import Login from './components/login/Login';
import Snackbar from './common/Snackbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Snackbar />
        <Login />
        <TopBar />
        <Switch>
          <Route exact path="/" component={Schedule} />
          <Route path="/homework" component={Homework} />
          <Route path="/message" component={Message} />
        </Switch>
        <LeftMenu />
      </div>
    );
  }
}

export default App;
