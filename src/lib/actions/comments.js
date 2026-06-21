'use server'

import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createComment = async (data) =>{
    const res = await fetch(`${baseUrl}/api/comments`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },

        body:JSON.stringify(data)
    });

    return res.json();
}




export const deleteComment = async (
  id,
  forumPostId,
  userId
) => {

  const res = await fetch(
    `${baseUrl}/api/comments/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  const result = await res.json();

  if (result.deletedCount > 0) {
    revalidatePath(`/community-forum/${forumPostId}`);
  }

  return result;
};





