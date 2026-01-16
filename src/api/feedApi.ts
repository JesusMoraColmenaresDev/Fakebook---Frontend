
import { useQuery } from "@tanstack/react-query"
import { FeedItemSchema, FeedResponseSchema } from "../types"
import { api } from "./apiConfig"
import { isAxiosError } from "axios"

export const getFeeds = async () => {
    try {
        const {data} = await api.get("/feed")
        const response = FeedResponseSchema.safeParse(data)
        if(response.success) return response.data
        throw new Error("Respuesta inválida al obtener feeds.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

export const useGetFeeds = () => {
    const {
        data: feeds,
        isLoading: isLoadingFeeds,
        error: feedsError
    } = useQuery({
        queryKey: ['feeds'],
        queryFn: getFeeds,
    })

    return {feeds, isLoadingFeeds, feedsError}

}


export const getFeedsByUser = async (userId  :string) => {
    try {
        const {data} = await api.get("/feed?user_id="+userId)
        const response = FeedResponseSchema.safeParse(data)
        if(response.success) return response.data
        throw new Error("Respuesta inválida al obtener feeds del usuario.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

export const useGetFeedsByUser = (userId  :string) => {
    const {
        data: feeds,
        isLoading: isLoadingFeeds,
        error: feedsError
    } = useQuery({
        queryKey: ['feeds', userId],
        queryFn: () => getFeedsByUser(userId!),
    })

    return {feeds, isLoadingFeeds, feedsError}

}