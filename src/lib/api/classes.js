import { serverFetch, protectedFetch } from "../core/server";

export const getAllClass = async () => {
    const result = await serverFetch("/api/classes");
    return Array.isArray(result) ? result : (result?.data || result?.classes || []);
};

export const getClassById = async (id) => {
    const result = await serverFetch(`/api/classes/${id}`);
    return result?.data || result || null;
};

export const getClass = async (trainerId, status = "active") => {
    const result = await protectedFetch(`/api/my/classes?trainerId=${trainerId}&status=${status}`);
    return Array.isArray(result) ? result : (result?.data || []);
};

export const getFavorites = async (userId) => {
    const result = await protectedFetch(`/api/favorites?userId=${userId}`);
    return Array.isArray(result) ? result : (result?.data || []);
};