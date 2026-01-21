
import { ShareSchema, type ShareFormType, type ShareEditType } from "../types/shareTypes"
import { api } from "./apiConfig"
import { isAxiosError } from "axios"

/**
 * Crea un nuevo 'share' de una publicación.
 * @param content El contenido del share.
 * @param post_id El ID del post que se está compartiendo.
 */
export const createShare = async ({ content, post_id }: ShareFormType) => {
    try {
        const { data } = await api.post("/shares", {
            share: {
                content: content,
                post_id: post_id
            }
        })
        const response = ShareSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
        throw new Error("Respuesta inválida al crear compartido.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}


/**
 * Actualiza el contenido de un 'share' existente.
 * @param shareId El ID del share a actualizar.
 * @param content El nuevo contenido del share.
 */
export const updateShare = async ({shareId , content} : ShareEditType) => {
    try {
        const { data } = await api.patch("/shares/" + shareId, {
            share: {
                content: content
            }
        })
        const response = ShareSchema.safeParse(data)
        if (response.success) return response.data
        throw new Error("Respuesta inválida al editar compartido.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

/**
 * Elimina un 'share'.
 * @param shareId El ID del share a eliminar.
 */
export const deleteShare = async (shareId: string) => {
    try {
        const response = await api.delete("/shares/" + shareId)
        return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
