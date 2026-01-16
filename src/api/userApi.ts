
import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { UserSchema, UserItemArraySchema, type UserType, type UserItemArrayType } from "../types";
import { isAxiosError } from "axios";

/**
 * Obtiene los datos del usuario actualmente autenticado.
 */
export const getCurrentUser = async (): Promise<UserType> => {
    try {
        const response = await api.get("/current_user");
        if (response.status === 200) {
            const parsedUser = UserSchema.safeParse(response.data.data);
            if (parsedUser.success) {
                return parsedUser.data;
            }
            throw new Error("Respuesta inválida al obtener usuario actual.");
        }
        throw new Error("Respuesta inválida del servidor al obtener usuario actual.");
    } catch (error) {
        localStorage.removeItem("token");
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Obtiene una lista de todos los usuarios (versión simplificada).
 */
export const getAllUsers = async (): Promise<UserItemArrayType> => {
    try {
        const { data } = await api.get("/users");
        const response = UserItemArraySchema.safeParse(data);
        if (response.success) return response.data;
        throw new Error("Respuesta inválida al obtener usuarios.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Obtiene la lista de amigos de un usuario específico.
 * @param userId El ID del usuario.
 */
export const getAllUserFriends = async (userId: string): Promise<UserItemArrayType> => {
    try {
        const {data} = await api.get("/users/" + userId + "/friends");
        const response = UserItemArraySchema.safeParse(data)
        if (response.success) return response.data;
        throw new Error("Respuesta inválida al obtener amigos del usuario.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Obtiene los datos completos de un usuario por su ID.
 * @param userId El ID del usuario.
 */
export const getUserById = async (userId: string): Promise<UserType> => {
    try {
        const { data } = await api.get("/users/" + userId);
        const response = UserSchema.safeParse(data);
        if (response.success) return response.data;
        throw new Error("Respuesta inválida al obtener usuario por ID.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Hook para obtener y cachear los datos de un perfil de usuario.
 * @param userId El ID del usuario.
 * @param isMyProfile Booleano que indica si es el perfil del usuario actual.
 */
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

/**
 * Hook para obtener y cachear la lista de amigos de un usuario.
 * @param userId El ID del usuario.
 */
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
