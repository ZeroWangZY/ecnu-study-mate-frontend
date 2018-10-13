import {
    getHomeworkDetailAPI, addHomeworkAPI, deleteHomeworkAPI, updateHomeworkAPI
} from "../../api/api";
import {setSnackText} from "./app";
import {getStudentId} from "../store";

export const refreshHomeworkManage = () => {
    return dispatch => {
        getHomeworkDetailAPI().then(data => {
            if(data!==undefined){
                dispatch(setHomeworkManage(data));
            }

        });
    }
}

export const addHomework = (title,content1,deadline,publisher,receiver) => {
    return dispatch => {
        addHomeworkAPI(title,content1,deadline,publisher,receiver)
            .then(res => {
                dispatch(refreshHomeworkManage());
                dispatch(setSnackText('homework添加成功'));
            })
    }
}

export const updateHomework = (homeworkID,title,content1,deadline,receiver,grade,state) => {
    return dispatch => {
        updateHomeworkAPI(homeworkID,title,content1,deadline,receiver,grade,state)
            .then(res => {
                dispatch(refreshHomeworkManage());
                dispatch(setSnackText("更新成功"));
            })

    }
}

export const deleteHomework = (id) => {
    return dispatch => {
        deleteHomeworkAPI(id)
            .then(res => {
                dispatch(refreshHomeworkManage(getStudentId()));
                dispatch(setSnackText('homework删除成功！'));
            })
    }
}
const setHomeworkManage = (data) => ({
    type:'SET_HOMEWORKMANAGE',
    data:data
})


