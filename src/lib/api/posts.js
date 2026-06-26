import { serverFetch } from "../core/server";

export const getAllForumPosts = () =>
    serverFetch("/api/forum");

export const getForumPosts = (trainerId) =>
    serverFetch(`/api/my/forum?trainerId=${trainerId}`);

export const getForumPostById = (id) =>
    serverFetch(`/api/forum/${id}`); 