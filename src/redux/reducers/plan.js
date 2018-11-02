const initialState = {
  weeks: []
}

const plan = (state = initialState, action) => {
  switch (action.type) {
    case 'REFRESH_PLAN_DATA':
      return { weeks: action.data }
    case 'ADD_SINGLE_PLAN':
      let plan = action.plan
      return {
        weeks: state.weeks.map(week => {
          if (plan.week === week.week) {
            return {
              ...week,
              items: [...week.items, plan]
            }
          } else {
            return week
          }
        })
      }
    default:
      return state
  }
}

export default plan
