// 'use server'

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createClass = async (data) =>{
//     const res = await fetch(`${baseUrl}/api/classes`,{
//         method:'POST',
//         headers:{
//             'Content-Type' : 'application/json'
//         },

//         body:JSON.stringify(data)
//     });

//     return res.json();
// }



// export const addToFavorites = async (data) =>{
//     const res = await fetch(`${baseUrl}/api/favorites`,{
//         method:'POST',
//         headers:{
//             'Content-Type' : 'application/json'
//         },

//         body:JSON.stringify(data)
//     });

//     return res.json();
// }



// export const removeFromFavorites = async (userId, classId) => {
//     const res = await fetch(`${baseUrl}/api/favorites`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ userId, classId })
//     });
 
//     return res.json();
// }





'use server';

import { serverMutation } from "../core/server";

export const createClass = (data) =>
    serverMutation("/api/classes", data);

export const addToFavorites = (data) =>
    serverMutation("/api/favorites", data);

export const removeFromFavorites = (userId, classId) =>
    serverMutation("/api/favorites",{ userId, classId },"DELETE");
