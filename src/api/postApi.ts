
import { useQuery } from "@tanstack/react-query"
import { PostSchema, PostArraySchema, type PostFormType, type PostEditType, type PostType } from "../types"
import { api } from "./apiConfig"
import { isAxiosError } from "axios"

/**
 * Crea una nueva publicación.
 * @param content El contenido de la publicación.
 * @param post_picture La URL de la imagen de la publicación.
 */
export const createPost = async ({content, post_picture} : PostFormType): Promise<PostType[]> => {
    try {
        const {data} = await api.post("/posts", {
            post: {
                content: content,
                post_picture: post_picture
            }
        })
        const response = PostArraySchema.safeParse(data)
        if(response.success){
            return response.data
        }
        throw new Error("Respuesta inválida al crear publicación.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Edita una publicación existente.
 * @param postId El ID de la publicación a editar.
 * @param content El nuevo contenido.
 * @param post_picture La nueva URL de la imagen.
 */
export const editPost = async ({postId , content, post_picture} : PostEditType): Promise<PostType> => {
    try {
        const { data } = await api.patch("/posts/" + postId, {
            post: {
                content: content,
                post_picture: post_picture
            }
        })
        const response = PostSchema.safeParse(data)
        if (response.success) return response.data;
        throw new Error("Respuesta inválida al editar publicación.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Elimina una publicación.
 * @param postId El ID de la publicación a eliminar.
 */
export const deletePost = async(postId: string) => {
    try {
        const response = await api.delete("/posts/" + postId)
        return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Obtiene una publicación específica por su ID.
 * @param postId El ID de la publicación.
 */
export const getPost = async(postId: string): Promise<PostType> => {
    try {
        const {data} = await api.get("/posts/" + postId)
        const response = PostSchema.safeParse(data)
        if(response.success) return response.data
        throw new Error("Respuesta inválida al obtener publicación.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Obtiene todas las publicaciones de un usuario específico.
 * @param userId El ID del usuario.
 */
export const getUserPosts = async (userId : string): Promise<PostType[]> => {
    try {
        const {data} = await api.get("/posts?user_id=" + userId)
        const response = PostArraySchema.safeParse(data)
        if(response.success) return response.data
        throw new Error("Respuesta inválida al obtener publicaciones del usuario.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Hook para obtener y cachear las publicaciones de un usuario.
 * @param userId El ID del usuario.
 */
export const useGetUserPosts = (userId : string) => {
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

/**
 * Hook para obtener y cachear una publicación específica.
 * @param postId El ID de la publicación.
 */
export const useGetPost = (postId : string) => {
    const {
        data: post,
        isLoading: isLoadingPost,
        error: postError
    } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPost(postId),
    })
    return {post, isLoadingPost, postError}
}