import type { shareDataType } from "../types"
import { api } from "./apiConfig"

export const createShare = async({content, post_id} : shareDataType) => {
    const {data} = await api.post("/shares",{
        share : {
            content: content,
            post_id: post_id
        }
    })

    console.log(data)

    return data
}

