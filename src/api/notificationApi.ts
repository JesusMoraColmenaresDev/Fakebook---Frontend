import { useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { notificationsResponseSchema, type notificationArrayType } from '../types';

export const getNotifications = async (): Promise<notificationArrayType | null> => {
    try {
        const { data } = await api.get('/notifications');
        const response = notificationsResponseSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }else{
            return null
        }

    } catch (error) {
        console.error("Error fetching notifications:", error);
        return null
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