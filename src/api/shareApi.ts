import { shareData, shareDataForItems, type shareDataType, type shareEditDataType } from "../types"
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



export const updateShare = async ({shareId , content} : shareEditDataType) => {
    const { data } = await api.patch("/shares/" + shareId, {
        share: {
            content: content
        }
    })

    const response = shareDataForItems.safeParse(data)
    if (response.success) return response.data
}

export const deleteShare = async (shareId: string) => {
    const response = await api.delete("/shares/" + shareId)
    return response.data
}
