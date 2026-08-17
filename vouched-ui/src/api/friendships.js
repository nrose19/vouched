import client from "./client";

export const getMyFriends = () => client.get("/friendships");
export const getPendingRequests = () => client.get("/friendships/pending");
export const acceptRequest = (friendshipId) => client.patch(`/friendships/${friendshipId}/accept`);
export const declineRequest = (friendshipId) => client.patch(`/friendships/${friendshipId}/decline`);
export const removeFriend = (friendshipId) => client.delete(`/friendships/${friendshipId}`);
