import { api } from "./ApiClient";

export const getStudents = () => api.get("/students");

export const saveStudent = (student) =>api.post("/students/create",student);

export const getStudentById = (id) => api.get(`/students/${id}`);

export const updateStudent = (studentUpdated) => api.put("/students/update",studentUpdated);

export const deleteStudentById = (id) => api.delete(`/students/delete/${id}`);