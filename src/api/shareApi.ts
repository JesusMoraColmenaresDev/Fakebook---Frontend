import { ShareSchema, type ShareFormType, type ShareEditType } from "../types"
import { api } from "./apiConfig"

/**
 * Crea un nuevo 'share' de una publicación.
 * @param content El contenido del share.
 * @param post_id El ID del post que se está compartiendo.
 */
export const createShare = async ({ content, post_id }: ShareFormType) => {
    const { data } = await api.post("/shares", {
        share: {
            content: content,
            post_id: post_id
        }
    })

    const response = ShareSchema.safeParse(data)
    if (response.success) {
        console.log(data)
        return response.data
    }
    return data
}


/**
 * Actualiza el contenido de un 'share' existente.
 * @param shareId El ID del share a actualizar.
 * @param content El nuevo contenido del share.
 */
export const updateShare = async ({shareId , content} : ShareEditType) => {
    const { data } = await api.patch("/shares/" + shareId, {
        share: {
            content: content
        }
    })

    const response = ShareSchema.safeParse(data)
    if (response.success) return response.data
}

/**
 * Elimina un 'share'.
 * @param shareId El ID del share a eliminar.
 */
export const deleteShare = async (shareId: string) => {
    const response = await api.delete("/shares/" + shareId)
    return response.data
}
