
import { useQuery } from "@tanstack/react-query"
import { api } from "./apiConfig"
import { friendshipData, friendshipDataArray } from "../types"

export const getFriendship = async (userId: string) => {
    const {data} = await api.get("/friendships/status/" + userId)
    const response = friendshipData.safeParse(data)
    if (response.success){
        return response.data
    }else{
        return null
    };
}

export const sendRequestFriendship = async (idProfile: string) => {
    const { data } = await api.post("/friendships", {
        friendship: {
            friend_id: idProfile
        }
    })
    const response = friendshipData.safeParse(data)
    if (response.success) return response.data;
}


export const acceptFriendship = async (idFriendship: string) => {
    const {data} = await api.patch("/friendships/" + idFriendship)
    const response = friendshipData.safeParse(data)
    if (response.success) return response.data;
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



