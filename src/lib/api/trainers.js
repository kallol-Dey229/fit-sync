// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 
// export const getAllTrainers = async () => {
//   const res = await fetch(`${baseUrl}/api/trainers`, {
//     cache: "no-store",
//   });
//   const text = await res.text();

//   return JSON.parse(text);
// };




import { serverFetch } from "../core/server";

export const getAllTrainers = () =>
    serverFetch("/api/trainers");