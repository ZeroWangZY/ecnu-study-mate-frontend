import {updateHomeworkAPI} from "../../api/api";
import {refreshHomework} from "./homework";
import {setSnackText} from "./app";

export const uploadFiles = (data) =>{
    return dispatch =>{
        updateHomeworkAPI(data)
            .then(res =>{
            dispatch(refreshHomework());
            dispatch(setSnackText("上传成功"));
        })
    }
}
