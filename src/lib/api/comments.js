


// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getCommentById = async (id) => {
//     // FIX: added { cache: 'no-store' } to ensure a live database check occurs every request
//     const res = await fetch(`${baseUrl}/api/comments/${id}`, { cache: 'no-store' });
    
//     if (!res.ok) {
//         return [];
//     }
//     return res.json();
// }




import { serverFetch } from "../core/server";

export const getCommentById = (id) =>
    serverFetch(`/api/comments/${id}`);