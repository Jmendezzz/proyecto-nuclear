import axios from "axios";
const api = axios.create({baseURL:"http://localhost:8080"});
export const getStudents = () => api.get("/students");
export const saveStudent = (student) =>api.post("/students",student);