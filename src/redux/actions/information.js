import {
    getInformationAPI,
    getMyInformationAPI,
    getMyFailedCoursesAPI,
    getFailedCoursesAPI,
    getReviewAPI,
    addReviewAPI,
    addStudentAPI,
    getAllStudentAPI,
    deleteCourseTableAPI,
    updateCourseTableAPI,
    addCourseTableAPI,
    updateInfoTabAPI
} from '../../api/information'
import { getRole, getReceiverId, getAdviserId, getCurrentStudentId } from '../store/index'
import { setSnackText } from './app'
import { getUserInfoAPI } from '../../api/user'
import { isNotNullAndUndefined } from '../../util/object'

// 当身份为学生时使用该函数
const refreshWhenUserIsStudent = dispatch => {
  getMyInformationAPI().then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { studentInfo: res.data }
    })
  })
  getMyFailedCoursesAPI().then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { failedCourses: res.data }
    })
  })
}

const refreshWhenUserIsAdvisor = dispatch => {
  const studentId = getReceiverId()
  const advisorId = getAdviserId()
  getInformationAPI(studentId).then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { studentInfo: res.data }
    })
  })
  getFailedCoursesAPI(studentId).then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { failedCourses: res.data }
    })
  })
  getReviewAPI(studentId).then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { reviews: res.data }
    })
  })
  getInformationAPI(advisorId).then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { partnerInfo: res.data }
    })
  })
}

const refreshWhenUserIsAdminOrTeacher = dispatch => {
  getAllStudentAPI()
    .then(res => {
      if (res.flag === 'T') {
        dispatch({
          type: 'SET_STUDENT_ID_LIST',
          data: res.data
        })
      } else {
        dispatch(setSnackText('获取学生列表失败'))
      }
    })
    .then(res => {
      getNewInformationWhenCurrentIdChanges(dispatch)
    })
}

const getNewInformationWhenCurrentIdChanges = dispatch => {
  let currentStudentId = getCurrentStudentId()
  getInformationAPI(currentStudentId).then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { studentInfo: res.data }
    })
  })
  getFailedCoursesAPI(currentStudentId).then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { failedCourses: res.data }
    })
  })
  getReviewAPI(currentStudentId).then(res => {
    dispatch({
      type: 'SET_INFORMATION',
      data: { reviews: res.data }
    })
  })
  getUserInfoAPI(currentStudentId).then(res => {
    if (res.flag !== 'F' && isNotNullAndUndefined(res.data) && isNotNullAndUndefined(res.data.advisorId)) {
      getInformationAPI(res.data.advisorId).then(res => {
        dispatch({
          type: 'SET_INFORMATION',
          data: { partnerInfo: res.data }
        })
      })
    }
  })
}

export const changeCurrentStudentId = id => dispatch => {
  dispatch({
    type: 'SET_INFORMATION',
    data: { currentStudentId: id }
  })
  getNewInformationWhenCurrentIdChanges(dispatch)
}

export const refreshInformation = dispatch => {
  let role = getRole()
  if (role === 'ROLE_USER') {
    dispatch(refreshWhenUserIsStudent)
  } else if (role === 'ROLE_ADVISOR') {
    dispatch(refreshWhenUserIsAdvisor)
  } else if (role === 'ROLE_PSYCHOLOGY' || role === 'ROLE_ADMIN') {
    dispatch(refreshWhenUserIsAdminOrTeacher)
  }
}

export const addReview = (id, overview, reason) => dispatch => {
  addReviewAPI(id, overview, reason).then(res => {
    if (res.flag === 'T') {
      dispatch(setSnackText('添加成功'))
    } else {
      dispatch(setSnackText('添加失败1'))
    }
    dispatch(refreshInformation)
  })
}

export const addStudent = (student_id) => dispatch => {
    addStudentAPI(student_id).then(res => {
        if (res.flag === 'T') {
            console.log(res)
            dispatch(setSnackText('添加成功'))
        } else {
            dispatch(setSnackText('添加失败2'))
        }
        dispatch(refreshInformation)
    })
}

export const updateCourseTable = (id, student_id, course_id, course_name, credit, type) => dispatch => {
    updateCourseTableAPI(id, student_id, course_id, course_name, credit, type).then(res => {
        if (res.flag === 'T') {
            console.log(res)
            dispatch(setSnackText('updateCourseTable添加成功'))
        } else {
            console.log(res)
            dispatch(setSnackText('updateCourseTable添加失败'))
        }
        dispatch(refreshInformation)
    })
}
export const deleteCourseTable = (id, student_id, course_id, course_name, credit, type) => dispatch => {
    deleteCourseTableAPI(id, student_id, course_id, course_name, credit, type).then(res => {
        if (res.flag === 'T') {
            dispatch(setSnackText('deleteCourseTable添加成功'))
        } else {
            dispatch(setSnackText('deleteCourseTable添加失败'))
        }
        dispatch(refreshInformation)
    })
}
export const addCourseTable = (student_id, course_id, course_name, credit, type) => dispatch => {
    addCourseTableAPI(student_id, course_id, course_name, credit, type).then(res => {
        if (res.flag === 'T') {
            console.log(res)
            dispatch(setSnackText('deleteCourseTable添加成功'))
        } else {
            console.log(res)
            dispatch(setSnackText('deleteCourseTable添加失败'))
        }
        dispatch(refreshInformation)
    })
}

export const setActioningFailCourse = (data) => ({
    type:'SET_INFORMATION',
    data: { actioningFailCourse: data }
})

export const updateInfoTab = (studentID) => dispatch =>{
    updateInfoTabAPI(studentID).then(res =>{
        if (res.flag === 'T') {
            console.log(res)
            dispatch(setSnackText('updateInfoTab更新成功'))
        } else {
            console.log(res)
            dispatch(setSnackText('updateInfoTab更新失败'))
        }
        dispatch(refreshInformation)
    })
}
