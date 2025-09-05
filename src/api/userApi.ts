import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { use } from "react";
import type { AllfriendshipDataType } from "../types";

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/current_user");
        if (response.status === 200) {
            return (response.data.data);
        }
    } catch (error) {
        console.error("La sesión ha expirado o el token es inválido:", error);
        localStorage.removeItem("token");
        return null
    }
}

export const getAllUsers = async () => {
    const response = await api.get("/users");
    return response.data;
}

export const getAllUserFriends = async(userId: string) => {
    const response = await api.get("/users/" + userId + "/friends");
    return response.data;
}


export const getUserById = async (userId: string) => {
    const response = await api.get("/users/" + userId);
    return response.data;
}


export const useGetUserById = (userId: string, isMyProfile: boolean) => {
        const { 
        data: profileUser, 
        isLoading: isLoadingUser, 
        error: userError 
    } = useQuery({
        queryKey: ['userProfile', userId],
        queryFn: () => getUserById(userId!),
        
        // `enabled` nos permite controlar si la consulta debe ejecutarse.
        // No queremos hacer una llamada a la API si estamos en nuestro propio perfil.
        enabled: !isMyProfile,
    });

    return {profileUser, isLoadingUser, userError}
}


export const useGetAllUserFriends = (userId: string) => {
        const { 
        data: Friends, 
        isLoading: isLoadingFriends, 
        error: friendsError 
    } = useQuery<AllfriendshipDataType>({
        queryKey: ['friends', userId],
        queryFn: () => getAllUserFriends(userId!),
        
        // `enabled` nos permite controlar si la consulta debe ejecutarse.
        // No queremos hacer una llamada a la API si estamos en nuestro propio perfil.
    });

    return {Friends, isLoadingFriends, friendsError}
}

