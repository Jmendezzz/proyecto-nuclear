import axios from "axios";

const api = axios.create( {baseURL:"http://localhost:8080" } );

export const getProfessors = () => api.get("/professors");
export const saveProfessor = (professor) =>api.post("/professors",professor);
export const getProfessorsById = (id) => api.get(`/professors/${id}`);
export const updateProfessors = (professorUpdated) => api.put("/professors",professorUpdated);
export const deleteProfessorById = (id) => api.delete(`/professors/${id}`);