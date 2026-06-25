import { protectedFetch } from "../core/server";

export const getAllApplication = () =>
    protectedFetch("/api/application");

export const getMyApplication = (userId) =>
    protectedFetch(`/api/application/user/${userId}`);