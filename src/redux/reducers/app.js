const app = (state = {
    shouldShowDrawer: false
}, action) => {
    switch (action.type) {
        case 'SET_DRAWER':
            console.log("SET_DRAWER works")
            let newState = {shouldShowDrawer: action.val}
            return newState;
        default:
            return state;
    }
}

export default app;