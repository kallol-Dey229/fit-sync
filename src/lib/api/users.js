

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



// export const getAllUsers = async () =>{
//     const res = await fetch(`${baseUrl}/api/user`);
//     return res.json();
// }





// export const setUserStatus = async (userId, status) => {
//     const res = await fetch(`${baseUrl}/api/user/${userId}/status`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status }),
//     });
 
//     return res.json();
// }
 
// export const promoteToAdmin = async (userId) => {
//     const res = await fetch(`${baseUrl}/api/user/${userId}/role`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action: 'promote' }),
//     });
 
//     return res.json();
// }
 
// export const demoteFromAdmin = async (userId) => {
//     const res = await fetch(`${baseUrl}/api/user/${userId}/role`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action: 'demote' }),
//     });
 
//     return res.json();
// }









'use server';

import { protectedFetch, serverMutation } from "../core/server";

export const getAllUsers = async () =>
    await protectedFetch("/api/user");

export const setUserStatus = async (id, status) =>
   await serverMutation(`/api/user/${id}/status`,{ status },"PATCH");




export const promoteToAdmin = async (id) =>

    await serverMutation(`/api/user/${id}/role`,{ action: "promote" },"PATCH");



export const demoteFromAdmin = async(id) =>

     await serverMutation(`/api/user/${id}/role`,{ action: "demote" },"PATCH");




export const demoteTrainerToUser = async (id) =>
    await serverMutation(`/api/user/${id}/role`,{ action: "demote-trainer" },"PATCH");