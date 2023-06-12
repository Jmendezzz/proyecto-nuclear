import { api } from "./ApiClient";
export const getClassrooms = () => api.get("/classrooms");

export const saveClassroom = (classroom) =>api.post("/classrooms/create",classroom);
export const getClassroomById = (id) => api.get(`/classrooms/${id}`)
export const updateClassroom = (classroomUpdated) => api.put("/classrooms/update",classroomUpdated);
export const deleteClassroomById = (id) => api.delete(`/classrooms/${id}`);