const app = (state = {
    shouldShowDrawer: false
}, action) => {
    switch (action.type) {
        case 'SET_DRAWER':
            console.log("SET_DRAWER works")
            return Object.assign({}, state, {shouldShowDrawer: action.val});
        default:
            return state;
    }
}

export default app;