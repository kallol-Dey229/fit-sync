


'use server';

import { serverMutation } from "../core/server";

export const createClass = async (data) => await serverMutation("/api/classes", data);

export const deleteClass = async (id) => await serverMutation(`/api/classes/${id}`, {}, "DELETE");

export const addToFavorites = async (data) => await serverMutation("/api/favorites", data);


export const removeFromFavorites = async (userId, classId) => await serverMutation("/api/favorites",{ userId, classId },"DELETE");
