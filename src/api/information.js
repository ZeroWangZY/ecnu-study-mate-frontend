import { post } from "./api";

export const getInformationAPI = (id) => post("/studoc/getbaseinfo", {reference_id: id})

export const getMyInformationAPI = () => post("/studoc/getmybaseinfo", {})

export const getFailedCourses = id => post("/studoc/getfailCourse", {reference_id: id})

export const getMyFailedCourses = id => post("/studoc/getMyfailCourse", {})