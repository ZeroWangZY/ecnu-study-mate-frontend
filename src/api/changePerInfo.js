import {post} from "./api";
import {getStudentId} from "../redux/store";

export const changePerInfoAPI = (password,newPassword,name,email) => {
    return post('/user/baseSqlHandle',{
            'name': name,
            'password': password,
            'newPassword': newPassword,
            'email': email,
    })
}
