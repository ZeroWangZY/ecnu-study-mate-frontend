import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Provider} from 'react-redux';
import {store, getDispatch} from './redux/store';
import {BrowserRouter} from 'react-router-dom';
import {updateTokenAction, refreshDataAfterAutoLogin} from './redux/actions/app';
import localForage from "localforage";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const localStore = localForage.createInstance({
  name: "xyt" + require("../package.json").version
});

localStore
  .getItem('app')
  .then(data => {
    if (data !== null && data.isLoginned) {
      getDispatch()(refreshDataAfterAutoLogin(data));
    }
  })

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

setInterval(() => {
  getDispatch()(updateTokenAction())
}, 100000)

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
