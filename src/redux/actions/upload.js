import {downFilesAPI, uploadFilesAPI} from "../../api/upload";
import {refreshHomework} from "./homework";
import {setSnackText} from "./app";

export const uploadFiles = (data,homeworkID) =>{
    return dispatch =>{
        uploadFilesAPI(data,homeworkID)
            .then(res =>{
                console.log(res);
                if(res.flag==='T'){
                    dispatch(refreshHomework());
                    dispatch(setSnackText("上传成功"));
                }else {
                    dispatch(setSnackText("上传不成功，请重新操作"));
                }
            })
    }
}


export const downloadFiles = (homeworkID) =>{
    return dispatch =>{
        downFilesAPI(homeworkID)
            .then(res =>{
                console.log(res);
                res.blob().then(blob => {
                    const aLink = document.createElement('a');
                    document.body.appendChild(aLink);
                    aLink.style.display='none';
                    const objectUrl = window.URL.createObjectURL(blob);
                    aLink.href = objectUrl;
                    aLink.download = "下载";
                    aLink.click();
                    document.body.removeChild(aLink);
                    dispatch(refreshHomework());
                });
            })
    }
}

export const failUploadMes = (ms) =>{
    return dispatch => {
        dispatch(setSnackText(ms))
    };
}
