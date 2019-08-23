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

export const addStudentAPI = (student_id) =>
    post("/studoc/addstudents", {
        "add" : [
            {
                "student_id" : student_id,
                "student_type" : "STUTEST"
            }
        ]
    })

export const getAllStudentAPI = () => post("/studoc/getstudents", {})

export const deleteCourseTableAPI = (id, student_id, course_id, course_name, credit, type) =>
    post("/studoc/deletefailcourses", {
        "delete" : [
            {
                "id" : id.toString(),
                "student_id" : student_id.toString(),
                "course_id" : course_id.toString(),
                "course_name" : course_name.toString(),
                "credit" : credit.toString(),
                "type" : type.toString()
            }
        ]
    })
export const updateCourseTableAPI = (id, student_id, course_id, course_name, credit, type) =>
    post("/studoc/updatefailcourses", {
        "update" : [
            {
                "id" : id.toString(),
                "student_id" : student_id.toString(),
                "course_id" : course_id.toString(),
                "course_name" : course_name.toString(),
                "credit" : credit.toString(),
                "type" : type.toString()
            }
        ]
    })

export const addCourseTableAPI = (student_id, course_id, course_name, credit, type) =>
    post("/studoc/addfailcourses", {
        "add" : [
            {
                "student_id" : student_id.toString(),
                "course_id" : course_id.toString(),
                "course_name" : course_name.toString(),
                "credit" : credit.toString(),
                "type" : type.toString()
            }
        ]
    })

// 还没有接口
export const updateInfoTabAPI = (student_id) =>
    post("", {
        "update" : [
            {
                "student_id" : student_id.toString()
            }
        ]
    })
