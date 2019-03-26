import {
  getInformationAPI,
  getMyInformationAPI,
  getMyFailedCoursesAPI,
  getFailedCoursesAPI,
  getReviewAPI,
  addReviewAPI,
  getAllStudentAPI
} from '../../api/information'
import { getRole, getReceiverId, getAdviserId, getCurrentStudentId } from '../store/index'
import { setSnackText } from './app'
import { getUserInfoAPI } from '../../api/user'
import { isNotNullAndUndefined } from '../../util/object'

const getInformation = id => dispatch => {
  getInformationAPI(id).then(res => console.log(res))
}

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
      dispatch(setSnackText('添加失败'))
    }
    dispatch(refreshInformation)
  })
}
