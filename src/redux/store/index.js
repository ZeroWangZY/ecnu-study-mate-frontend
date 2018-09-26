import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

const unsubscribe = store.subscribe(() => {
    // TODO: 自动保存本地
})

const getAccessToken = () => store.getState().app.accessToken
const getStudentId = () => store.getState().app.studetnId

export { store, getAccessToken, getStudentId }