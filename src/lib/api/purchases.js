import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const createPurchase = async (purchase) => {
  return serverMutation("/api/purchases", purchase);
};
 
export const checkPurchase = async (classId, email) => {
  return protectedFetch(`/api/purchases/check?classId=${classId}&email=${email}`);
};
 
export const getUserPurchases = async (email) => {
  return protectedFetch(`/api/purchases?email=${email}`);
};
 



export const getAllPurchases = async () => {
  return protectedFetch("/api/purchases/all");
};