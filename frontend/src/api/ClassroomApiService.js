import axios from "axios";

const api = axios.create(
    {
        baseURL:"http://localhost:8080"
    }
);

export const getClassrooms = () => api.get("/classrooms");

export const saveClassroom = (classroom) =>api.post("/classrooms",classroom);
export const getClassroomById = (id) => api.get(`/classrooms/${id}`)
export const updateClassroom = (classroomUpdated) => api.put("/classrooms",classroomUpdated);
export const deleteClassroomById = (id) => api.delete(`/classrooms/${id}`);