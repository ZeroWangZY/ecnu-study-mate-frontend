import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/reducers';

const store = createStore (rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

BigCalendar.setLocalizer (BigCalendar.momentLocalizer (moment));

ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('root')
);
registerServiceWorker ();
