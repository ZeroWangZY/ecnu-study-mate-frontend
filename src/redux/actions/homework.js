import {
    getHomeworkDetailAPI, addHomeworkAPI, deleteHomeworkAPI, changeHomeworkContentAPI, changeHomeworkMarkAPI,
    homeworkFinishAPI, updateHomeworkAPI
} from "../../api/api";
import {setSnackText} from "./app";
import {getStudentId} from "../store";

export const refreshHomework = (id) => {
    console.log("1111111");
    return dispatch => {
        getHomeworkDetailAPI(id).then(data => {
  //          writeObj(data);
            dispatch(setHomework(data));
        });
    }
}

export const addHomework = (title,content1,deadline,publisher,receiver) => {
    return dispatch => {
        addHomeworkAPI(title,content1,deadline,publisher,receiver)
            .then(res => {
                dispatch(refreshHomework(getStudentId()));
                dispatch(setSnackText('homeworka添加成功'));
            })
    }
}

export const updateHomework = (id,title,content1,deadline,publisher,receiver) => {
    return dispatch => {
        updateHomeworkAPI(id,title,content1,deadline,publisher,receiver)
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
                dispatch(refreshHomework(id));
                dispatch(setSnackText('homework删除成功！'));
            })
    }
}
const setHomework = (data) => ({
    type:'SET_HOMEWORK',
    data:data
})

function writeObj(obj){
    var description = "";
    var des2='';
    for(var i in obj){
        var property=obj[i];
        description+=i+" = "+property+"\n";
        for(var j in property){
            var a=property[j];
            des2+=j+" = " +a+"\n";
        }
        console.log(des2);
    }
    //alert(description);
  //  console.log(description);
}
