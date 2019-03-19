const initialState = {
    studentIdList: [],
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
    failedCourses: []
}

const information = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INFORMATION':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default information;