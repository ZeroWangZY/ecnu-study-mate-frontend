import { getStudentId, getAccessToken, getRefreshToken, getUserInfo ,getReceiverId} from "../redux/store";

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

export const post = (url, data) => {
    return fetch(urlPrefix + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAccessToken()
        }
    }).then(res => res.json())
}

export const downpost = (url, data) => {
    return fetch(urlPrefix + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAccessToken()
        }
    }).then(res => res)
}

export const filePost = (url, data1,homeworkID) => {
    let data =new FormData();
    data.append('file',data1);
    data.append('homeworkID',homeworkID);
    console.log(data1);
    let request = new Request(urlPrefix + url, {
        method: 'POST',
        mode:'cors',
        headers: {
            'Authorization': 'Bearer ' + getAccessToken()
        },
        body: data
    });
    return fetch(request)
        .then( res => res.json())
        .catch((err)=>{
        console.log("发生了一个错误,存在相同的文件或者上传文件不合法;");
    });
}

export const getUserInfoAPI = (id) => {
    return post('/user/getInfo', {
        studentId: id
    })
}

export const getScheduleAPI = () => {
    return post('/schedule/search', {
        eq_studentId: getUserInfo().studentId,
        limit: 1000
    }).then(res => res.data.rows)
}

export const addScheduleAPI = (title, desc, start, end, type, progress) => {
    return post('/schedule/baseSqlHandle', {
        insert: [{
            'studentId': getStudentId(),
            'startTime': start.replace('T', ':'),
            'endTime': end.replace('T', ':'),
            'scheduleType': 'calendar',
            'title': title,
            'content': desc,
            'scheduleTag': type,
            'progress': progress
        }],
        update: [],
        delete: []
    });
}

export const updateScheduleAPI = (id, title, desc, start, end, type, progress) => {
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
            'scheduleTag': type,
            'progress': progress
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

export const getHomeworkDetailAPI = () => {
    let data = {
        receiver_id: getReceiverId()
    }
    return post('/homework/search',data).then(res =>res.data);
}

export const addHomeworkAPI = (title,content1,deadline,publisher,receiver) => {
  //  console.log("addHomeworkAPI"+" "+title+" "+content1+" "+deadline+" "+publisher+" "+receiver);
    return post('/homework/add', {
            'title':title,
            'content':content1,
            'deadline':deadline,
            'publisher':publisher,
            'receiver':receiver
    })
}

export const deleteHomeworkAPI = (homeworkID) => {
    return post('/homework/delete',{
        "homework_id" : homeworkID
    });
}

export const updateHomeworkAPI = (homeworkID,title,content1,deadline,receiver,grade,state) =>{
    console.log("updateHomeworkAPI"+content1);
    return post("/homework/update",{
        'title':title,
        "homework_id" : homeworkID,
        'content':content1,
        'deadline':deadline,
        'grade':grade
    });
}

export const changeHomeworkContentAPI = (id,content) => {
    return post('/homework/content',{
            'content':content,
            'homework_id':id
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

export const uploadFilesAPI =(data,homeworkID)=>{
    return filePost('/file/fileupload',data,homeworkID);
}

export const downFilesAPI =(homeworkID)=>{
    return downpost('/file/filedownload',{
        'homeworkID':homeworkID
    });
}
