import { getInformationAPI, getMyInformationAPI, getMyFailedCourses } from "../../api/information";
import { getRole } from "../store/index";




const getInformation = id => dispatch => {
    getInformationAPI(id).then(res => console.log(res))
}

// 当身份为学生时使用该函数
const refreshWhenUserIsStudent = dispatch => {
    getMyInformationAPI()
    .then(res => {
        dispatch({
            type: 'SET_INFORMATION',
            data: {studentInfo: res.data}
        })
    })
    getMyFailedCourses()
    .then(res => {
        dispatch({
            type: 'SET_INFORMATION',
            data: {failedCourses: res.data}
        })
    })
}

export const refreshInformation = dispatch => {
    let role = getRole();
    if (role === 'ROLE_USER') {
        dispatch(refreshWhenUserIsStudent)
    }
}