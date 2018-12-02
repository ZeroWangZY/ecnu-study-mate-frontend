import {
    getHomeworkDetailAPI
} from "../../api/homework";

export const refreshHomework = () => {
    return dispatch => {
        getHomeworkDetailAPI().then(data => {
            if(data!==undefined) {
                dispatch(setHomework(data));
            }
        });
    }
}

const setHomework = (data) => ({
    type:'SET_HOMEWORK',
    data:data
})

