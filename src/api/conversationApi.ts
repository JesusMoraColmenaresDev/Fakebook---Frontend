
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ConversationSchema, type ConversationType, type ConversationListItemType, ConversationListSchema } from "../types/conversationTypes";
import { MessageArraySchema, type MessageType } from "../types/messageTypes";
import { isAxiosError } from "axios";

/**
 * Llama a la API para crear una nueva conversación o encontrar una existente entre dos usuarios.
 * @param receiverId El ID del usuario con el que se quiere conversar.
 */
export const createOrGetConversation = async (receiverId: string): Promise<ConversationType> => {
  try {
    const { data } = await api.post('/conversations', { receiver_id: receiverId });
    const response = ConversationSchema.safeParse(data);
    if (!response.success) {
      throw new Error("Los datos recibidos del servidor son inválidos.");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error desconocido del servidor");
    }
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

/**
 * Hook de mutación para crear/obtener una conversación y navegar a ella si tiene éxito.
 */
export const useCreateOrGetConversation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createOrGetConversation,
    onSuccess: (data) => {
      // Al tener éxito, navegamos a la vista de la conversación específica.
      navigate(`/conversation/${data.id}`);
    },
    onError: (error) => {
      console.error("Error al crear o encontrar la conversación:", error);
      toast.error("No se pudo iniciar la conversación.");
    },
  });
};

/**
 * Obtiene el historial de mensajes para una conversación específica.
 * @param conversationId El ID de la conversación.
 */
export const getMessages = async (conversationId: string): Promise<MessageType[]> => {
  try {
    const { data } = await api.get(`/conversations/${conversationId}/messages`);
    console.log("Datos puros recibidos de la API de mensajes:", data);
    const response = MessageArraySchema.safeParse(data);
    if (!response.success) {
      throw new Error("Los datos de mensajes recibidos del servidor son inválidos.");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error desconocido del servidor");
    }
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

/**
 * Hook para obtener y cachear el historial de mensajes de una conversación.
 */
export const useGetMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages(conversationId),
    // Deshabilitamos el refetch en foco, ya que los WebSockets se encargarán de las actualizaciones.
    refetchOnWindowFocus: false,
  });
};

/**
 * Marca un mensaje como leído en la API.
 * @param messageId El ID del mensaje a marcar como leído.
 */
export const markMessageAsRead = async (messageId: string): Promise<MessageType> => {
  try {
    const { data } = await api.patch(`/messages/${messageId}/read`);
    console.log("read del mensaje actualizado:", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error desconocido del servidor");
    }
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

/**
 * Hook para marcar un mensaje como leído.
 */
export const useMarkMessageAsRead = () => {
  return useMutation({
    mutationFn: markMessageAsRead,
    onError: (error) => {
      console.log("Error al marcar el mensaje como leído:", error);
      toast.error("No se pudo marcar el mensaje como leído.");
    },
  });
};



/**
 * Obtiene la lista de todas las conversaciones del usuario actual.
 */
export const getConversations = async (): Promise<ConversationListItemType[]> => {
  try {
    const { data } = await api.get('/conversations');
    const response = ConversationListSchema.safeParse(data);
    if (!response.success) {
      throw new Error("Los datos de conversaciones recibidos del servidor son inválidos.");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error desconocido del servidor");
    }
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

/**
 * Hook para obtener y cachear la lista de conversaciones del usuario.
 */
export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  });
};

