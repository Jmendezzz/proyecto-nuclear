import axios from "axios";

const api = axios.create( {baseURL:"http://localhost:8080/" } );

export const getCourses = ()=> api.get("/courses");

export const deleteCourseById = (courseId) => api.delete(`/courses/delete/${courseId}`);

export const generateCourses = (courses)=> api.post("/courses/generate", courses );