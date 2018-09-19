const app = (state = {
    shouldShowDrawer: false,
    isLoginned: false
}, action) => {
    switch (action.type) {
        case 'SET_DRAWER':
            console.log("SET_DRAWER works")
            return Object.assign({}, state, { shouldShowDrawer: action.val });
        case 'LOGIN':
            console.log("LOGIN works")
            return Object.assign({}, state, { isLoginned: true });
        default:
            return state;
    }
}

export default app;