import axios from "axios";

const api = axios.create( {baseURL:"http://localhost:8080/" } );

export const getProfessors = () => api.get("/professors");
export const saveProfessor = (professor) =>api.post("/professors/create",professor);
export const getProfessorById = (id) => api.get(`/professors/${id}`);
export const updateProfessors = (professorUpdated) => api.put("/professors/update",professorUpdated);
export const deleteProfessorById = (id) => api.delete(`/professors/delete/${id}`);
export const setScheduleProfessor = (id, professorSchedule) => api.put(`/professors/${id}/schedule`, professorSchedule);
export const deleteScheduleProfessor = (id, professorSchedule) => api.put(`/professors/${id}/schedule/delete`, professorSchedule);
