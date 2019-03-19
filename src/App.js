import React, { Component } from 'react';
import TopBar from './common/TopBar';
import LeftMenu from './common/LeftMenu';
import { Route, Switch } from 'react-router-dom';
import Homework from './components/homework/Homework';
import Plan from './components/plan/Plan';
import Schedule from './components/schedule/Schedule';
import Message from './components/message/Message';
import Login from './components/login/Login';
import Snackbar from './common/Snackbar';
import HomeworkManage from "./components/homeworkManage/HomeworkManage";
import EmotionSurvey from './components/emotion/EmotionSurvey';
import ChangePerInfo from './components/changePerInfo/ChangePerInfo';
import Information from './components/information/Information';

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
          <Route path="/plan" component={Plan} />
          <Route path="/homeworkManage" component={HomeworkManage} />
          <Route path="/message" component={Message} />
          <Route path="/emotion" component={EmotionSurvey} />
          <Route path="/changePerInfo" component={ChangePerInfo} />
          <Route path="/information" component={Information} />
        </Switch>
        <LeftMenu />
      </div>
    );
  }
}

export default App;
