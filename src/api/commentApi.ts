import { useQuery } from "@tanstack/react-query";
import { CommentSchema, CommentArraySchema, type CreateCommentType } from "../types/commentTypes";
import { ShareSchema, type ShareType } from "../types/shareTypes";
import { PostSchema, type PostType } from "../types/postTypes";
import { api } from "./apiConfig";



/**
 * Obtiene los comentarios para un post o un share específico.
 * param type - El tipo de contenido ('posts' o 'shares').
 * param id - El ID del post o share.
 * returns Una promesa que resuelve a un array de comentarios.
 */
import { isAxiosError } from "axios";

export const getComments = async (type: CreateCommentType['type'], id: CreateCommentType['id']) => {
    try {
        const { data } = await api.get(`/${type}/${id}/comments`);
        const response = CommentArraySchema.safeParse(data);
        if (response.success) return response.data;
        throw new Error("Respuesta inválida al obtener comentarios.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
};

export const createComment = async ({ type, id, content }: CreateCommentType) => { 
    try {
        const { data } = await api.post(`/${type}/${id}/comments`, { content });
        const response = CommentSchema.safeParse(data);
        if (response.success) return response.data;
        throw new Error("Respuesta inválida al crear comentario.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
};


export async function getItem(type : CreateCommentType['type'], id: string) {
    try {
        const { data } = await api.get(`/${type}/${id}`);
        if(type === 'posts'){
            const response = PostSchema.safeParse(data);
            if (response.success) return response.data;
            throw new Error("Respuesta inválida al obtener post.");
        }
        if(type === 'shares'){
            const response = ShareSchema.safeParse(data);
            if (response.success) return response.data;
            throw new Error("Respuesta inválida al obtener share.");
        }
        throw new Error("Tipo de item desconocido.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

export const useGetComments = (type: CreateCommentType['type'], id: CreateCommentType['id']) => {
    const {
        data: comments,
        isLoading: isLoadingComments,
        error: commentsError
    } = useQuery({
        queryKey: ['comments',type,id],
        // La queryFn debe ser una función que llame a la función de fetch
        queryFn: () => getComments(type, id),
    });

    return { comments, isLoadingComments, commentsError }
}

export const useGetItem = (type: 'posts' | 'shares', id: CreateCommentType['id']) => {
    const {
        data: item,
        isLoading: isLoadingItem,
        error: itemError
    } = useQuery({
        queryKey: ['item',type,id],
        // Anotamos explícitamente el tipo de retorno de la promesa para que useQuery no se confunda.
        // Le decimos que esperamos UNA promesa que resuelva a un Post O un Share.
        queryFn: (): Promise<PostType | ShareType | undefined> => {
            return getItem(type, id)
        },
    });

    return { item, isLoadingItem, itemError }
}
