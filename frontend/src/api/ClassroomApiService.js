import axios from "axios";

const api = axios.create(
    {
        baseURL:"http://localhost:8080"
    }
);

export const getClassrooms = () => api.get("/classrooms");

export const saveClassroom = (classroom) =>api.post("/classrooms",classroom);