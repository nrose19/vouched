import client from "./client";

export const getSpots = () => client.get("/spots");
export const getSpotById = (id) => client.get(`/spots/${id}`);
export const createSpot = (data) => client.post("/spots", data);
export const updateSpot = (id, data) => client.put(`/spots/${id}`, data);
export const deleteSpot = (id) => client.delete(`/spots/${id}`);