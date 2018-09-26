import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Provider } from 'react-redux';
import { store, getDispatch } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { updateTokenAction, setApp } from './redux/actions/app';
import localForage from "localforage";

const localStore = localForage.createInstance({
  name: "xyt"
});

localStore.getItem('app').then(data => {
  if (data !== null) {
    getDispatch()(setApp(data));
  }
})

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

setInterval(() => {
  getDispatch()(updateTokenAction())
}, 100000)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
