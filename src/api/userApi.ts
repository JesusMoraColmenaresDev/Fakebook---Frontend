import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { use } from "react";
import { userData, userDataArray, userDataForItemsArray, type AllfriendshipDataType } from "../types";

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
    const { data } = await api.get("/users");
    const response = userDataForItemsArray.safeParse(data);
    console.log(response.error?.message)
    if (response.success) return response.data;
}

export const getAllUserFriends = async (userId: string) => {
    const {data} = await api.get("/users/" + userId + "/friends");
    const response = userDataForItemsArray.safeParse(data)
     if (response.success) return response.data;
}


export const getUserById = async (userId: string) => {
    const { data } = await api.get("/users/" + userId);
    const response = userData.safeParse(data);
    console.log(response)
    if (response.success) return response.data;
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

    return { profileUser, isLoadingUser, userError }
}


export const useGetAllUserFriends = (userId: string) => {
    const {
        data: Friends,
        isLoading: isLoadingFriends,
        error: friendsError
    } = useQuery({
        queryKey: ['UsersFriends', userId],
        queryFn: () => getAllUserFriends(userId!),

        // `enabled` nos permite controlar si la consulta debe ejecutarse.
        // No queremos hacer una llamada a la API si estamos en nuestro propio perfil.
    });

    return { Friends, isLoadingFriends, friendsError }
}

