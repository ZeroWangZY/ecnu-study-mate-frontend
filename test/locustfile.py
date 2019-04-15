from locust import HttpLocust, TaskSet, task
import json

class UserBehavior(TaskSet):
    
    id = "10165101228"

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.id = UserBehavior.id
        self.accessToken = ""
        self.login()

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        print('stop')

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
        print('login success, token = '+ token)

    @task(1)
    def index(self):
        self.client.get("/")

    @task(1)
    def getInfo(self):
        response = self.client.post("/api/user/getInfo", json = {"studentId": self.id}, headers = self.getHeader())
        print(response.content)

    # @task(1)
    # def profile(self):
    #     self.client.get("/profile")

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000