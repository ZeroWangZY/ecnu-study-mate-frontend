const homework = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOMEWORK':
            return action.data;
        default:
            return state;
    }
}

export default homework;
