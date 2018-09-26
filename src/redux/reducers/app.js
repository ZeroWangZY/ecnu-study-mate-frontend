const initialState = {
    shouldShowDrawer: false,
    isLoginned: false,
    studentId: null,
    accessToken: null
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DRAWER':
            return Object.assign({}, state, { shouldShowDrawer: action.val });
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoginned: true,
                studentId: action.studentId,
                accessToken: action.accessToken
            });
        default:
            return state;
    }
}

export default app;