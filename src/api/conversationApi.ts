import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./apiConfig";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


// 1. Definimos un esquema para asegurarnos de que la respuesta del servidor tiene la forma que esperamos.
const conversationSchema = z.object({
  id: z.number(),
  sender_id: z.number(),
  receiver_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

type ConversationType = z.infer<typeof conversationSchema>;

// 2. Esta es la función que se comunicará con tu backend.
export const createOrGetConversation = async (receiverId: string): Promise<ConversationType> => {
  const { data } = await api.post('/conversations', { receiver_id: receiverId });
  const response = conversationSchema.safeParse(data);

  if (!response.success) {
    throw new Error("Los datos recibidos del servidor son inválidos.");
  }
  return response.data;
};

// 3. Creamos el hook de mutación que usaremos en nuestro componente.
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

// --- LÓGICA PARA OBTENER MENSAJES ---

// 1. Definimos los esquemas para los mensajes.
const messageUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  last_name: z.string(),
});

const messageSchema = z.object({
  id: z.number(),
  content: z.string(),
  user_id: z.number(),
  created_at: z.string(),
  user: messageUserSchema,
});

const messagesSchema = z.array(messageSchema);

export type MessageType = z.infer<typeof messageSchema>;

// 2. Función para obtener el historial de mensajes de una conversación.
export const getMessages = async (conversationId: string): Promise<MessageType[]> => {
  const { data } = await api.get(`/conversations/${conversationId}/messages`);
  const response = messagesSchema.safeParse(data);

  if (!response.success) {
    console.error(response.error);
    throw new Error("Los datos de mensajes recibidos del servidor son inválidos.");
  }
  return response.data;
};

// 3. Hook para usar la función en nuestros componentes.
export const useGetMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages(conversationId),
    // Deshabilitamos el refetch en foco, ya que los WebSockets se encargarán de las actualizaciones.
    refetchOnWindowFocus: false,
  });
};
