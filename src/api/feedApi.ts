import { FeedItemSchema, FeedResponseSchema } from "../types"
import { api } from "./apiConfig"

export const getFeeds = async () => {
    const {data} = await api.get("/feed")
    const response = FeedResponseSchema.safeParse(data)
    console.log(response)
    if(response.success) return response.data

 
}