

'use server';

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createForumPost = async (data) =>
    await serverMutation("/api/forum", data);

export const deleteForumPost = async (id) => {
    const result = await serverMutation(`/api/forum/${id}`, {}, "DELETE");
 
    revalidatePath("/admin/manage-posts");
 
    return result;
};


export const voteOnPost = async (postId, likes, dislikes) =>
    await serverMutation(`/api/forum/${postId}/vote`, { likes, dislikes }, "PATCH");