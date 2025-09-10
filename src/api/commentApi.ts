import { useQuery } from "@tanstack/react-query";
import { CommentData, CommentDataArray, postData, shareDataForItems, type CreateCommentType, type postDataItemType, type shareDataTypeForItems } from "../types";
import { api } from "./apiConfig";



/**
 * Obtiene los comentarios para un post o un share específico.
 * param type - El tipo de contenido ('posts' o 'shares').
 * param id - El ID del post o share.
 * returns Una promesa que resuelve a un array de comentarios.
 */
export const getComments = async (type: CreateCommentType['type'], id: CreateCommentType['id']) => {
    const { data } = await api.get(`/${type}/${id}/comments`);
    const response = CommentDataArray.safeParse(data)
    if (response.success) return response.data
};

export const createComment = async ({ type, id, content }: CreateCommentType) => { 
    const { data } = await api.post(`/${type}/${id}/comments`, { content });
    const response = CommentData.safeParse(data)
    if (response.success) return response.data
};


export async function getItem(type : CreateCommentType['type'], id: string) {
    const { data } = await api.get(`/${type}/${id}`);
    if(type === 'posts'){
        const response = postData.safeParse(data)
        if (response.success) return response.data
    }
    if(type === 'shares'){
        const response = shareDataForItems.safeParse(data)
        if (response.success) return response.data
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
        queryFn: (): Promise<postDataItemType | shareDataTypeForItems | undefined> => {
            return getItem(type, id)
        },
    });

    return { item, isLoadingItem, itemError }
}
