import {changePerInfoAPI} from "../../api/changePerInfo";
import {setSnackText} from "./app";

export const changePerInfo = (name,username,email,password,oldPwd,sex,phone) => dispatch =>{
    console.log(name+"  "+username+"  "+email+"  "+password+"  "+oldPwd+"  "+sex+"  "+phone)
    changePerInfoAPI(name,username,email,password,oldPwd,sex,phone)
        .then(res => {
            console.log(res);
                dispatch(failMes(res.data.info));

    })
}
export const failMes = (ms) =>{
    return dispatch => {
        dispatch(setSnackText(ms))
    };
}
