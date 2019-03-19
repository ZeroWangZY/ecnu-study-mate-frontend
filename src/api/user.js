import {post} from "./api";
import { getStudentId, getRefreshToken} from "../redux/store";

const urlPrefix = '/api'

export const loginAPI = (id, password) => {
    return fetch(urlPrefix + '/oauth/token?username=' + id + '&password=' + password + '&grant_type=password', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic cGRmOjEyMzQ1Ng=='
        }
    }).then(res => {
        if(res.status >= 200 && res.status < 300){
            return res.json();
        } else {
            return res.json().then(Promise.reject.bind(Promise));
        }
    })
}

export const refreshTokenAPI = () => {
    return fetch(urlPrefix + '/oauth/token?username=' + getStudentId() + '&refresh_token=' + getRefreshToken() + '&grant_type=refresh_token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic cGRmOjEyMzQ1Ng=='
        }
    }).then(res => {
        if(res.status >= 200 && res.status < 300){
            return res.json();
        } else {
            return res.json().then(Promise.reject.bind(Promise));
        }
    })
}


export const getUserInfoAPI = (id) => post('/user/getInfo', { studentId: id })

