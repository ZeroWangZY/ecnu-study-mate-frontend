const schedule = (state = {
    all: []
}, action) => {
    switch (action.type) {
        case 'REFRESH_SCHEDULE':
            console.log("REFRESH_SCHEDULE works")
            return Object.assign({}, state, { all: action.data });
        case 'REFRESH_SCHEDULE_STATE':
            console.log("REFRESH_SCHEDULE_STATE works")
            return Object.assign({}, state, { all: action.data });
        default:
            return state;
    }
}

export default schedule;