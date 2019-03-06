import {post} from "./api";
import {getStudentId} from "../redux/store";

export const changePerInfoAPI = (name,username,email,password,oldPwd,sex,phone) => {
    return post('/user/modifyInfo',{
            'name': name,
            'username': username,
            'email':email,
            'password': password,
            'oldPwd': oldPwd,
            'sex': sex,
            'phone': phone
    })
}
