import {uploadFilesAPI} from "../../api/api";
import {refreshHomework} from "./homework";
import {setSnackText} from "./app";

export const uploadFiles = (data,homeworkID) =>{
    return dispatch =>{
        uploadFilesAPI(data,homeworkID)
            .then(res =>{
                console.log(res);
                if(res.flag==='T'){
                    dispatch(refreshHomework());
                    console.log(11111);
                    dispatch(setSnackText("上传成功"));
                }else {
                    dispatch(setSnackText("上传不成功，请重新操作"));
                }
        })
    }
}
