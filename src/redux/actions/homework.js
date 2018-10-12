import {
    getHomeworkDetailAPI
} from "../../api/api";

export const refreshHomework = (id) => {
    return dispatch => {
        getHomeworkDetailAPI(id).then(data => {
            if(data!=undefined) {
                dispatch(setHomework(data));
            }
        });
    }
}

const setHomework = (data) => ({
    type:'SET_HOMEWORK',
    data:data
})

