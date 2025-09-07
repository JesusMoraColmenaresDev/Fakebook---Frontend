import { useQuery } from "@tanstack/react-query"
import { postDataArray, type postDataFormType } from "../types"
import { api } from "./apiConfig"



export const createPost = async ({content, post_picture} : postDataFormType) => {
    const {data} = await api.post("/posts", {
        post: {
            content: content,
            post_picture: post_picture
        }
    })
    const response = postDataArray.safeParse(data)
    console.log(response.data)
    if(response.success){
        return response.data
    }
}

export const getUserPosts = async (userId : string) => {
    const {data} = await api.get("/posts?user_id=" + userId)
    const response = postDataArray.safeParse(data)
    if(response.success) return response.data
}


export const usegetUserPosts = (userId : string) => {
    const {
        data: posts,
        isLoading: isLoadingPosts,
        error: postsError
    
    } = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => getUserPosts(userId),
    })

    return {posts, isLoadingPosts, postsError}
}