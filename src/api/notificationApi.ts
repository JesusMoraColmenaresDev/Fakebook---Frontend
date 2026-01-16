
import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { notificationsResponseSchema, type notificationArrayType } from '../types';
import { isAxiosError } from "axios";

export const getNotifications = async (): Promise<notificationArrayType> => {
    try {
        const { data } = await api.get('/notifications');
        const response = notificationsResponseSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
        throw new Error("Respuesta inválida al obtener notificaciones.");
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor");
        }
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
};

/**
 * Hook para obtener y cachear la lista de notificaciones del usuario.
 * @param enabled Booleano para controlar si la consulta debe ejecutarse.
 */
export const useGetNotifications = (enabled: boolean) => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications,
        enabled: enabled,
        // Deshabilitamos el refetch en foco, ya que los WebSockets se encargarán de las actualizaciones en tiempo real.
        refetchOnWindowFocus: false,
    });
}