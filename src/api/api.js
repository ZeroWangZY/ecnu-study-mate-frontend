let access_token = '';
let studentId;
const urlPrefix = '/api'

export const loginAPI = (id, password) => {
    studentId = id + ''
    return fetch(urlPrefix + '/oauth/token?username=' + id + '&password=' + password + '&grant_type=password', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic cGRmOjEyMzQ1Ng=='
        }
    }).then(res => res.json())
        .then(res => {
            access_token = res.access_token;
            return res;
        })
        .catch(error => console.error('Error:', error));
}

const post = (url, data) => {
    return fetch(urlPrefix + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
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
            'studentId': studentId,
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