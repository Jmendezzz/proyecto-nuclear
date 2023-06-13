import { api } from "./ApiClient";

export const getSubjects = () => api.get("/subjects");

export const getSubjectById = (id) => api.get(`/subjects/${id}`)

export const saveSubject = (subject) =>api.post("/subjects/create",subject);

export const updateSubject = (subjectUpdated) => api.put("/subjects/update",subjectUpdated);

export const deleteSubjectById = (id) => api.delete(`/subjects/delete/${id}`);