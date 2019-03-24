import { post } from "./api";

export const getInformationAPI = id => post("/studoc/getbaseinfo", {reference_id: id})

export const getMyInformationAPI = () => post("/studoc/getmybaseinfo", {})

export const getFailedCoursesAPI = id => post("/studoc/getfailCourse", {reference_id: id})

export const getMyFailedCoursesAPI = () => post("/studoc/getMyfailCourse", {})

export const getReviewAPI = id => post("/studoc/getqs", {reference_id: id})

export const addReviewAPI = (id, overview, reason) => 
    post("/studoc/addqs", {
        reference_id: '' + id,
        answers: [
          {
            "type" : "1",
            "keys" : '',
            "others" : overview
          }, {
            "type" : "2",
            "keys" : [],
            "others" : reason
          }
        ]
    })

export const getAllStudentAPI = () => post("/studoc/getstudents", {})