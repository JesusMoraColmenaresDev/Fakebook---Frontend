
import { useQuery } from "@tanstack/react-query"
import { api } from "./apiConfig"
import type { AllfriendshipDataType } from "../types"

export const getFriendship = async (userId: string) => {
    const statusFriendship = await api.get("/friendships/status/" + userId)
    return statusFriendship.data

}

export const getAllFriendships = async () => {
    const response = await api.get("/friendships")
    return response.data
}

export const sendRequestFriendship = async (idProfile: string) => {
    const response = await api.post("/friendships", {
        friendship: {
            friend_id: idProfile
        }
    })
    return response.data
}


export const acceptFriendship = async (idFriendship: string) => {
    const response = await api.patch("/friendships/" + idFriendship)
    return response.data
}

export const deleteFriendship = async (idFriendship: string) => {
    const response = await api.delete("/friendships/" + idFriendship)
    return response.data
}

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


export const useGetAllFriendship = () => {
    const {
        data: allFriendship,
        isLoading: isLoadingFriendship,
        error: friendshipError
    } = useQuery<AllfriendshipDataType>({
        queryKey: ['Allfriendship'],
        queryFn: () => getAllFriendships(),
    })

    return(
        {allFriendship, isLoadingFriendship, friendshipError}
    )
}

