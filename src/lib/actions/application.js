

"use server";

import { protectedFetch, serverMutation } from "../core/server";


export const applyAsTrainer = async (data) => {
    return await serverMutation("/api/application", data);
};


export const getMyApplication = async (userId) => {
    return await protectedFetch(`/api/application/user/${userId}`);
};



export const updateApplicationStatus = async (id, status) => {
    return await serverMutation(
        `/api/application/${id}`,
        { status },
        "PATCH"
    );
};
