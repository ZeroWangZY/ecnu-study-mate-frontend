from locust import HttpLocust, TaskSet, task
import json

class UserBehavior(TaskSet):
    
    id = 10000001

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.id = str(UserBehavior.id)
        UserBehavior.id = UserBehavior.id + 1
        self.accessToken = ""
        self.login()

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        print(self.id + 'stop')

    def getHeader(self):
        return {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + self.accessToken
        }

    def login(self):
        headers = {"Authorization": "Basic cGRmOjEyMzQ1Ng=="}
        url = "/api/oauth/token?username=" + self.id + "&password=" + self.id + "&grant_type=password"
        response = self.client.post(url, headers=headers)
        token = json.loads(response.content)["access_token"]
        self.accessToken = token
        print(self.id + ' login success, token = '+ token)

    @task(1)
    def getSchedule(self):
        response = self.client.post("/api/schedule/search", json = {"eq_studentId": self.id, "limit": 1000}, headers=self.getHeader())
        print(self.id + " get schedule" + response.content)
        return json.loads(response.content)["data"]["rows"][0]["id"]

    @task(1)
    def getInfo(self):
        response = self.client.post("/api/user/getInfo", json = {"studentId": self.id}, headers = self.getHeader())
        print(self.id + " get info" + response.content)

    @task(2)
    def addAndDeleteSchedule(self):
        response = self.client.post("/api/schedule/baseSqlHandle",
            json = {
                "insert": [
                {
                    "studentId": self.id,
                    "startTime": "2019-04-15:16:52",
                    "endTime": "2019-04-15:17:52",
                    "scheduleType": 'calendar',
                    "title": "title",
                    "content": "desc",
                }
                ],
                "update": [],
                "delete": []
            }, headers=self.getHeader())
        print(self.id + " add schedule" + response.content)
        id = self.getSchedule()
        response = self.client.post("/api/schedule/baseSqlHandle", json={
            "insert": [],
            "update": [],
            "delete": [id]
        }, headers=self.getHeader())
        print(self.id + " delete schedule" + response.content)




class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 1000
    max_wait = 5000