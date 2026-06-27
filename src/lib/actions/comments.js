


'use server';

import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";

export const createComment = async (data) =>
    await serverMutation("/api/comments", data);

export const deleteComment = async (id,forumPostId,userId) => {

    const result = await serverMutation(`/api/comments/${id}`,{ userId },"DELETE");

    if (result.deletedCount > 0) {
        revalidatePath(`/community-forum/${forumPostId}`);
    }

    return result;
};





export const editComment = async (id, forumPostId, userId, comment) => {
 
    const result = await serverMutation(`/api/comments/${id}`, { userId, comment }, "PATCH");
 
    if (result.modifiedCount > 0) {
        revalidatePath(`/community-forum/${forumPostId}`);
    }
 
    return result;
};

