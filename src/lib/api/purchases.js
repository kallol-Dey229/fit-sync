import { serverFetch, serverMutation } from "../core/server";

export const createPurchase = async (purchase) => {
  return serverMutation("/api/purchases", purchase);
};
 
export const checkPurchase = async (classId, email) => {
  return serverFetch(`/api/purchases/check?classId=${classId}&email=${email}`);
};
 
export const getUserPurchases = async (email) => {
  return serverFetch(`/api/purchases?email=${email}`);
};
 
export const getWriterSales = async (email) => {
  return serverFetch(`/api/sales?email=${email}`);
}; 