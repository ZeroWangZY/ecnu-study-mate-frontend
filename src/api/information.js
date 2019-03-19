import { post } from "./api";

export const getInformationAPI = (id) => post("/studoc/getbaseinfo", {reference_id: id})

export const getMyInformationAPI = () => post("/studoc/getmybaseinfo")