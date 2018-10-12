const homeworkManage = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOMEWORKMANAGE':
            return action.data;
        default:
            return state;
    }
}

export default homeworkManage;
