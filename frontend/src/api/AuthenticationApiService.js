import { api } from "./ApiClient";

export const login = (username,password)=> api.post("/login", {username,password});