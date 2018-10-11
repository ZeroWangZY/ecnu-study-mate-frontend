import {post} from "./api";
import {getStudentId, getStudentInfo, getUserInfo} from "../redux/store";

export const addScheduleReviewAPI = (content) => {
  return post('/schedule/addReview', {
    reviewer_id: getStudentId(),
    student_id: getUserInfo().studentId,
    content: content
  })
}

export const getScheduleReviewAPI = () => {
  return post('/schedule/searchReview', {
    student_id: getUserInfo().studentId
  }).then(res => res.data)
}

export const deleteScheduleReviewAPI = (id) => {
  return post('/schedule/deleteReview', {
    review_id: id
  })
}