import client from './client';

export const registerUser = (data) => client.post("/auth/register", data);
export const loginUser = (data) => client.post("/auth/login", data);
export const logoutUser = (data) => client.post("/auth/logout", data);