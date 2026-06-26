
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createForumPost = async (data) =>{
//     const res = await fetch(`${baseUrl}/api/forum`,{
//         method:'POST',
//         headers:{
//             'Content-Type' : 'application/json'
//         },

//         body:JSON.stringify(data)
//     });

//     return res.json();
// }



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