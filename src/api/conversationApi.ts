import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ConversationSchema, MessageArraySchema, type ConversationType, type MessageType, type ConversationListItemType, ConversationListSchema } from "../types";

/**
 * Llama a la API para crear una nueva conversación o encontrar una existente entre dos usuarios.
 * @param receiverId El ID del usuario con el que se quiere conversar.
 */
export const createOrGetConversation = async (receiverId: string): Promise<ConversationType> => {
  const { data } = await api.post('/conversations', { receiver_id: receiverId });
  const response = ConversationSchema.safeParse(data);

  if (!response.success) {
    throw new Error("Los datos recibidos del servidor son inválidos.");
  }
  return response.data;
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
  const { data } = await api.get(`/conversations/${conversationId}/messages`);
  const response = MessageArraySchema.safeParse(data);

  if (!response.success) {
    console.error(response.error);
    throw new Error("Los datos de mensajes recibidos del servidor son inválidos.");
  }
  return response.data;
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
 * Obtiene la lista de todas las conversaciones del usuario actual.
 */
export const getConversations = async (): Promise<ConversationListItemType[]> => {
  const { data } = await api.get('/conversations');
  const response = ConversationListSchema.safeParse(data);

  if (!response.success) {
    console.error(response.error);
    throw new Error("Los datos de conversaciones recibidos del servidor son inválidos.");
  }
  return response.data;
};

/**
 * Hook para obtener y cachear la lista de conversaciones del usuario.
 */
export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
    // Opcional: Refrescar la lista de chats cada cierto tiempo.
    // refetchInterval: 30000, 
  });
};
