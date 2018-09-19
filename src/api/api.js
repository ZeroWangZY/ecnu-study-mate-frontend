let access_token = '';

export const loginAPI = (id, password) => {
    return fetch('/oauth/token?username=' + id + '&password=' + password + '&grant_type=password', {
        method: 'POST',
        headers:{
          'Authorization': 'Basic cGRmOjEyMzQ1Ng=='
        }
      }).then(res => res.json())
      .then(res => {
          access_token = res.access_token;
          return res;
      })
      .catch(error => console.error('Error:', error));
}

