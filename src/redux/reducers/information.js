const initialState = {
  studentIdList: [],
  actioningFailCourse:{
    action:'none',
    courseID:'0',
    courseName:'none',
    credit:0,
    id:0,
    studentID:0,
    type:""
  },
  currentStudentId: null, // used for select which student to show if the user is admin or teacher
  studentInfo: {
    studentID: 0,
    studnetName: 'none',
    grade: 'none',
    gpa: 0,
    credit: 0
  },
  partnerInfo: {
    studentID: 0,
    studentName: 'none',
    grade: 'none',
    gpa: 0,
    credit: 0
  },
  failedCourses: [],
  reviews: [
    {
      answerList: [
        {
          id: 246,
          stateId: 15,
          studentId: 20130034,
          questionId: 1,
          content: ''
        },
        {
          id: 247,
          stateId: 15,
          studentId: 20130034,
          questionId: 2,
          content: '1,2,3,其他'
        }
      ],
      userName: 'xx',
      time: '2019-xx-xx'
    }
  ]
}

const information = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INFORMATION':
      return Object.assign({}, state, action.data)
    case 'SET_STUDENT_ID_LIST':
      let data = {
        studentIdList: action.data
      }
      if (state.currentStudentId === null) {
        data.currentStudentId = action.data[0]
      }
      return Object.assign({}, state, data)
    default:
      return state
  }
}

export default information
