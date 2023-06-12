import { api } from "./ApiClient";

export const getUserDetails = (id) => api.get(`/users/${id}/details`);

export const updatePassword = (id, currentPassword, newPassword) => api.put(`/users/${id}/password`, {currentPassword,newPassword});
