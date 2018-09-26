import { getStudentId, getAccessToken } from "../redux/store";

const urlPrefix = '/api'

export const loginAPI = (id, password) => {
    return fetch(urlPrefix + '/oauth/token?username=' + id + '&password=' + password + '&grant_type=password', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic cGRmOjEyMzQ1Ng=='
        }
    })
}

const post = (url, data) => {
    return fetch(urlPrefix + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAccessToken()
        }
    }).then(res => res.json())
}


export const getMonthScheduleAPI = () => {
    let time = new Date();
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    let day = time.getDate() + 1 < 10 ? '0' + (time.getDate() + 1) : time.getDate() + 1;
    let data = {
        'date': time.getFullYear() + '-' + month + '-' + day
    }
    return post('/schedule/getMonthSchedule', data).then(res => res.data.list);
}

export const addScheduleAPI = (title, desc, start, end) => {
    return post('/schedule/baseSqlHandle', {
        insert: [{
            'studentId': getStudentId(),
            'startTime': start.replace('T', ':'),
            'endTime': end.replace('T', ':'),
            'scheduleType': 'calendar',
            'title': title,
            'content': desc,
            'scheduleTag': 'study'
        }],
        update: [],
        delete: []
    });
}

export const updateScheduleAPI = (id, title, desc, start, end) => {
    return post('/schedule/baseSqlHandle', {
        insert: [],
        update: [{
            'id': id,
            'studentId': getStudentId(),
            'startTime': start.replace('T', ':'),
            'endTime': end.replace('T', ':'),
            'scheduleType': 'calendar',
            'title': title,
            'content': desc,
            'scheduleTag': 'study'
        }],
        delete: []
    });
}

export const deleteScheduleAPI = (id) => {
    return post('/schedule/baseSqlHandle', {
        insert: [],
        update: [],
        delete: [id]
    });
}