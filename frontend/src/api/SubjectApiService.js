import axios from "axios";

const api = axios.create(
    {
        baseURL:"http://localhost:8080"
    }
);

export const getSubjects = () => api.get("/subjects");

export const saveSubject = (subject) =>api.post("/subjects",subject);