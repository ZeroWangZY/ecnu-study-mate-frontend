const initialState = {
    
}

const information = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return Object.assign({}, state, action.val);
        default:
            return state;
    }
}

export default information;