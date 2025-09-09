import { shareData, shareDataForItems, type shareDataType } from "../types"
import { api } from "./apiConfig"

export const createShare = async ({ content, post_id }: shareDataType) => {
    const { data } = await api.post("/shares", {
        share: {
            content: content,
            post_id: post_id
        }
    })

    const response = shareDataForItems.safeParse(data)
    if (response.success) {
        console.log(data)
        return response.data
    }
    return data
}

export const getShares = async (userId : string) => {
    
}

