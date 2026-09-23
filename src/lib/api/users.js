'use server';

import { protectedFetch, serverMutation } from "../core/server";

export const getAllUsers = async () =>
    {
        const result = await protectedFetch("/api/user");
        return Array.isArray(result) ? result : (result?.data || result?.users || []);
    };

export const setUserStatus = async (id, status) =>
   await serverMutation(`/api/user/${id}/status`,{ status },"PATCH");



export const promoteToAdmin = async (id) =>

    await serverMutation(`/api/user/${id}/role`,{ action: "promote" },"PATCH");



export const demoteFromAdmin = async(id) =>

     await serverMutation(`/api/user/${id}/role`,{ action: "demote" },"PATCH");




export const demoteTrainerToUser = async (id) =>
    await serverMutation(`/api/user/${id}/role`,{ action: "demote-trainer" },"PATCH");