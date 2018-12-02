import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import localForage from 'localforage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);

const localStore = localForage.createInstance({
    name: "xyt" + require("../../../package.json").version
});

store.subscribe(() => {
    localStore.setItem('app', store.getState().app).catch(err => {
        console.log(err);
    })
})

const getAccessToken = () => store.getState().app.accessToken
const getStudentId = () => store.getState().app.studentId
const getRefreshToken = () => store.getState().app.refreshToken
const getRole = () => store.getState().app.role
const getUserInfo = () => store.getState().app.userInfo
const getAdviserId = () => store.getState().app.userInfo.advisorId//小老师的id
const getReceiverId = () =>store.getState().app.userInfo.studentId//被辅导学生的id
const getStudentInfo = () => store.getState().app.studentInfo
const getDispatch = () => store.dispatch

export { store, getAccessToken, getStudentId, getRefreshToken, getDispatch, getRole, getUserInfo, getStudentInfo,getAdviserId,getReceiverId}
