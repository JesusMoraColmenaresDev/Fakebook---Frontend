
import { useQuery } from "@tanstack/react-query"
import { api } from "./apiConfig"
import { FriendshipSchema, type FriendshipType } from "../types";

/**
 * Obtiene el estado de la amistad con un usuario específico.
 * @param userId El ID del usuario a verificar.
 */
export const getFriendship = async (userId: string): Promise<FriendshipType | null> => {
    const {data} = await api.get("/friendships/status/" + userId)
    const response = FriendshipSchema.safeParse(data)
    if (response.success){
        return response.data
    }else{
        return null
    };
}

/**
 * Envía una solicitud de amistad a un usuario.
 * @param idProfile El ID del perfil al que se envía la solicitud.
 */
export const sendRequestFriendship = async (idProfile: string): Promise<FriendshipType | undefined> => {
    const { data } = await api.post("/friendships", {
        friendship: {
            friend_id: idProfile
        }
    })
    const response = FriendshipSchema.safeParse(data)
    if (response.success) return response.data;
}


/**
 * Acepta una solicitud de amistad.
 * @param idFriendship El ID de la amistad a aceptar.
 */
export const acceptFriendship = async (idFriendship: string): Promise<FriendshipType | undefined> => {
    const {data} = await api.patch("/friendships/" + idFriendship)
    const response = FriendshipSchema.safeParse(data)
    if (response.success) return response.data;
}

/**
 * Elimina una amistad o cancela una solicitud.
 * @param idFriendship El ID de la amistad a eliminar.
 */
export const deleteFriendship = async (idFriendship: string) => {
    const response = await api.delete("/friendships/" + idFriendship)
    return response.data
}

/**
 * Hook para obtener y cachear el estado de la amistad con un usuario.
 * @param userId El ID del usuario.
 * @param isMyProfile Booleano que indica si es el perfil del usuario actual.
 */
export const useGetFriendship = (userId: string, isMyProfile: boolean) => {
    const {
        data: friendshipProfileUser,
        isLoading: isLoadingFriendship,
        error: friendshipError
    } = useQuery({
        queryKey: ['friendship', userId],
        queryFn: () => getFriendship(userId),
        enabled: !isMyProfile,
    })

    return (
        { friendshipProfileUser, isLoadingFriendship, friendshipError }
    )
}
