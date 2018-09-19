const schedule = (state = {
    all: []
}, action) => {
    switch (action.type) {
        case 'REFRESH_SCHEDULE':
            console.log("REFRESH_SCHEDULE works")
            return Object.assign({}, state, { all: action.data });
        default:
            return state;
    }
}

export default schedule;