import { getInformationAPI, getMyInformationAPI } from "../../api/information";
import { getStudentId } from "../store/index";

export const getInformation = () => dispatch => {
    getInformationAPI(getStudentId()).then(res => console.log(res))
}

export const getMyInformation = () => dispatch => {
    getMyInformationAPI()
}