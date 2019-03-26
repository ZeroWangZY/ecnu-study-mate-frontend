import { getAccessToken } from '../redux/store'

export const urlPrefix = '/api'

export const post = (url, data) => {
  return fetch(urlPrefix + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getAccessToken()
    }
  }).then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.json()
    } else {
      return Promise.reject.bind(Promise)
    }
  })
}
