const initialState = {
    shouldShowDrawer: false,
    isLoginned: false,
    studentId: null,
    accessToken: null,
    refreshToken: null,
    snackbarText: '',
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DRAWER':
            return Object.assign({}, state, { shouldShowDrawer: action.val });
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoginned: true,
                studentId: action.studentId,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoginned: false,
                studentId: null,
                accessToken: null,
                refreshToken: null
            });
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            });
        case 'SET_SNACK_TEXT':
            return Object.assign({}, state, {
                snackbarText: action.text
            });
        case 'SET_APP':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default app;