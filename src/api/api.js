import { getStudentId, getAccessToken, getRefreshToken } from "../redux/store";

const urlPrefix = '/api'

export const loginAPI = (id, password) => {
    return fetch(urlPrefix + '/oauth/token?username=' + id + '&password=' + password + '&grant_type=password', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic cGRmOjEyMzQ1Ng=='
        }
    }).then(res => {
        if(res.status >= 200 && res.status < 300){
            console.log("loginapi"+res);
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
  //  console.log(data.date.toString());
    return post('/schedule/getMonthSchedule', data).then(res => res.data.list);
}

export const addScheduleAPI = (title, desc, start, end) => {

    //console.log(getStudentId());
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

export const getHomeworkDetailAPI = (id) => {
    let data = {
        'receiver_id': id
    }
    return post('/homework/search',data).then(res =>res.data);
}

export const addHomeworkAPI = (title,content1,deadline,publisher,receiver) => {
    return post('/homework/add',{
        insert:[{
            'title':title,
            'content':content1,
            'deadline':deadline,
            'publisher':publisher,
            'receiver':receiver
    }],
        update: [],
        delete: []
    });
}

export const deleteHomeworkAPI = (id) => {
    return post('/homework/delete',{
        insert:[],
        update:[],
        delete:[id]
    });
}

export const updateHomeworkAPI = (id,title,content1,deadline,publisher,receiver) =>{
    return post("")
}

export const changeHomeworkContentAPI = (id,content) => {
    return post('/homework/content',{
        insert:[],
        update:[{
            'content':content,
            'homework_id':id
        }],
        delete:[]
    });
}

export const changeHomeworkMarkAPI = (id,grade) =>{
    return post('/homework/mark',{
        insert:[],
        update:[{
            'grade':grade,
            'homework_id':id
        }],
        delete:[]
    });
}

export const homeworkFinishAPI = (id) =>{
    return post('/homework/finish',{
        insert:[],
        update:[{
            'homework_id':id
        }],
        delete:[]
    });
}
