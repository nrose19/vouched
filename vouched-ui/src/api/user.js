import client from "./client";

export const searchUser = (query) => client.get("/users/search", {params: {query}});