const initialState = {
    shouldShowDrawer: false,
    isLoginned: false,
    studentId: null,  // 登录者的id
    accessToken: null,
    refreshToken: null,
    snackbarText: '', // 提示框文字
    userInfo: {},
    role: null,  // 用户角色
    studentInfo: {} // 如果用户是导师，他所指导学生的信息
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
            return initialState;
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