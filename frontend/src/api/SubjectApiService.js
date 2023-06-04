import axios from "axios";

const api = axios.create(
    {
        baseURL:"http://localhost:8080"
    }
);

export const getSubjects = () => api.get("/subjects");

export const getSubjectById = (id) => api.get(`/subjects/${id}`)

export const saveSubject = (subject) =>api.post("/subjects",subject);

export const updateSubject = (subjectUpdated) => api.put("/subjects",subjectUpdated);