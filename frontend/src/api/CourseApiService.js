import axios from "axios";

const api = axios.create( {baseURL:"http://localhost:8080/" } );

export const getCourses = ()=> api.get("/courses");

export const deleteCourseById = (courseId) => axios.delete(`/courses/delete/${courseId}`)