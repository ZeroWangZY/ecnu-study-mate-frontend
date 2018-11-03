import { getStudentId, getAccessToken, getRefreshToken, getUserInfo ,getReceiverId} from "../redux/store";

const urlPrefix = '/api'

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
