const initialState = {
  weeks: []
}

const plan = (state = initialState, action) => {
  switch (action.type) {
    case 'REFRESH_PLAN_DATA':
      return { weeks: action.data }
    default:
      return state
  }
}

export default plan
