import { useQuery } from "@tanstack/react-query"
import { FeedItemSchema, FeedResponseSchema } from "../types"
import { api } from "./apiConfig"

export const getFeeds = async () => {
    const {data} = await api.get("/feed")
    const response = FeedResponseSchema.safeParse(data)
    console.log(response)
    if(response.success) return response.data
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
    const {data} = await api.get("/feed?user_id="+userId)
    const response = FeedResponseSchema.safeParse(data)
    console.log(response)
    if(response.success) return response.data
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