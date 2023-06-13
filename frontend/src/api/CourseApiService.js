import { api } from "./ApiClient";

export const getCourses = ()=> api.get("/courses");

export const deleteCourseById = (courseId) => api.delete(`/courses/delete/${courseId}`);

export const generateCourses = (courses)=> api.post("/courses/generate", courses );

export const getCoursesByProfessorId = (professorId) => api.get(`/courses/professors/${professorId}`);

export const getCoursesByStudentId = (studentId) => api.get(`/courses/students/${studentId}`);