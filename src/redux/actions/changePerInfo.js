import {changePerInfoAPI} from "../../api/changePerInfo";
import {setSnackText} from "./app";

export const changePerInfo = (password,newPassword,name,email) => dispatch =>{
    changePerInfoAPI(password,newPassword,name,email)
        .then(res => {
            console.log(res);

    })
}
export const failMes = (ms) =>{
    return dispatch => {
        dispatch(setSnackText(ms))
    };
}
