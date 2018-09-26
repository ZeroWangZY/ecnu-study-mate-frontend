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
import { updateTokenAction } from './redux/actions/app';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
let dispatch = getDispatch();

setInterval(() => {
  dispatch(updateTokenAction())
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
