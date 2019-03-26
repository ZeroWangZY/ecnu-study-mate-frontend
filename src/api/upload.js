import { getAccessToken } from '../redux/store'

const urlPrefix = '/api'

export const downpost = (url, data) => {
  return fetch(urlPrefix + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getAccessToken()
    }
  }).then(res => res)
}

export const filePost = (url, data1, homeworkID) => {
  let data = new FormData()
  data.append('file', data1)
  data.append('homeworkID', homeworkID)
  console.log(data1)
  let request = new Request(urlPrefix + url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
    },
    body: data
  })
  return fetch(request)
    .then(res => res.json())
    .catch(err => {
      console.log('发生了一个错误,存在相同的文件或者上传文件不合法;')
    })
}

export const uploadFilesAPI = (data, homeworkID) => {
  return filePost('/file/fileupload', data, homeworkID)
}

export const downFilesAPI = homeworkID => {
  return downpost('/file/filedownload', {
    homeworkID: homeworkID
  })
}
