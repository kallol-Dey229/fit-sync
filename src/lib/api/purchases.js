import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const createPurchase = async (purchase) => {
  return serverMutation("/api/purchases", purchase);
};
 
export const checkPurchase = async (classId, email) => {
  const result = await protectedFetch(`/api/purchases/check?classId=${classId}&email=${email}`);
  return result?.data || result || { purchased: false };
};
 
export const getUserPurchases = async (email) => {
  const result = await protectedFetch(`/api/purchases?email=${email}`);
  return Array.isArray(result) ? result : (result?.data || []);
};
 
export const getAllPurchases = async () => {
  const result = await protectedFetch("/api/purchases/all");
  return Array.isArray(result) ? result : (result?.data || []);
};

//