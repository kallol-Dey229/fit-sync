import { serverFetch, protectedFetch } from "../core/server";

export const getAllClass = async () => {
    return serverFetch("/api/classes");
};

export const getClassById = async (id) => {
    return serverFetch(`/api/classes/${id}`);
};

export const getClass = async (trainerId, status = "active") => {
    return protectedFetch(`/api/my/classes?trainerId=${trainerId}&status=${status}`);
};

export const getFavorites = async (userId) => {
    return protectedFetch(`/api/favorites?userId=${userId}`);
};