const changePerInfo = (state=[],action) =>{
    switch (action.type) {
        case 'CHANGE_PERINFO':
            return action.data;
        default:
            return state;
    }
}

export default changePerInfo;
