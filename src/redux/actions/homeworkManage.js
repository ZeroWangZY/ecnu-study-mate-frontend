import {
    getHomeworkDetailAPI, addHomeworkAPI, deleteHomeworkAPI, changeHomeworkContentAPI, changeHomeworkMarkAPI,
    homeworkFinishAPI, updateHomeworkAPI
} from "../../api/api";
import {setSnackText} from "./app";
import {getStudentId} from "../store";

export const refreshHomework = (id) => {
    return dispatch => {
        getHomeworkDetailAPI(id).then(data => {
            if(data!=undefined){
                dispatch(setHomeworkManage(data));
            }

        });
    }
}

export const addHomework = (title,content1,deadline,publisher,receiver) => {
    return dispatch => {
        addHomeworkAPI(title,content1,deadline,publisher,receiver)
            .then(res => {
                dispatch(refreshHomework(getStudentId()));
                dispatch(setSnackText('homework添加成功'));
            })
    }
}

export const updateHomework = (homeworkID,title,content1,deadline,receiver,grade,state) => {
    return dispatch => {
        updateHomeworkAPI(homeworkID,title,content1,deadline,receiver,grade,state)
            .then(res => {
                dispatch(refreshHomework(getStudentId()));
                dispatch(setSnackText("更新成功"));
            })

    }
}

export const deleteHomework = (id) => {
    return dispatch => {
        deleteHomeworkAPI(id)
            .then(res => {
                dispatch(refreshHomework(getStudentId()));
                dispatch(setSnackText('homework删除成功！'));
            })
    }
}
const setHomeworkManage = (data) => ({
    type:'SET_HOMEWORKMANAGE',
    data:data
})


