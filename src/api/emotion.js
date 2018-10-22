import {post} from "./api";
import {getStudentId} from "../redux/store";

export const commitSurveyAPI = (answers) => {
  return post('/questionnaire/finishQs', {
    studentId: getStudentId() + '',
    answers: answers
  })
}