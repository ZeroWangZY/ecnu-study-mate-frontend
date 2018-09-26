import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import localForage from 'localforage';

let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

const localStore = localForage.createInstance({
    name: "xyt"
});

store.subscribe(() => {
    localStore.setItem('app', store.getState().app).catch(err => {
        console.log(err);
    })
})

const getAccessToken = () => store.getState().app.accessToken
const getStudentId = () => store.getState().app.studentId
const getRefreshToken = () => store.getState().app.refreshToken
const getDispatch = () => store.dispatch

export { store, getAccessToken, getStudentId, getRefreshToken, getDispatch }