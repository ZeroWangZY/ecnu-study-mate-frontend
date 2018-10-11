const initialState = {
  scheduleList: [],
  reviewList: []
}

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SCHEDULE':
      return Object.assign({}, state, {scheduleList: action.data});
    case 'SET_SCHEDULE_REVIEW':
      return Object.assign({}, state, {reviewList: action.data});
    default:
      return state;
  }
}

export default schedule;