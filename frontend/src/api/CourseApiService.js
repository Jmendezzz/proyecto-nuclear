import { api } from "./ApiClient";

export const getCourses = ()=> api.get("/courses");

export const deleteCourseById = (courseId) => api.delete(`/courses/delete/${courseId}`);

export const generateCourses = (courses)=> api.post("/courses/generate", courses );