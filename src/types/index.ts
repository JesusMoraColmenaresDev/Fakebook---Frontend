// ...existing code...
import { z } from "zod";
import { UserItemSchema } from "./userTypes";
import { PostSchema } from "./postTypes";
import { ShareSchema } from "./shareTypes";
// ...existing code...

// ...existing code...

// ...existing code...

// ...existing code...

// ...existing code...

// ...existing code...


// ...existing code...
/*
// --- Conversation Schemas ---
export const ConversationSchema = z.object({
    id: z.number(),
    sender_id: z.number(),
    receiver_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const ConversationArraySchema = z.array(ConversationSchema);

// Esquema para el último mensaje, que puede ser nulo.
const LastMessageSchema = z.object({
    content: z.string(),
    created_at: z.string(),
    user_id: z.number(),
}).nullable();

export const ConversationListItemSchema = z.object({
    id: z.number(),
    other_user: UserItemSchema,
    last_message: LastMessageSchema.nullable(), // <-- Ahora acepta 'null'
    unread_count: z.number(),
    updated_at: z.string(),
});
export const ConversationListSchema = z.array(ConversationListItemSchema);
*/
// Define los posibles valores para 'action_type' basándose en tu enum de Rails.
/*
const actionTypeSchema = z.enum([
    'new_comment',
    'new_share',
    'new_friendship_request',
    'accepted_friendship',
]);

// Define los posibles tipos de 'notifiable' basándose en los modelos polimórficos del backend.
const notifiableTypeSchema = z.enum(['Comment', 'Share', 'Friendship', 'Post']);
*/
// Esquema para un único objeto de notificación.
// ...existing code...

// --- TypeScript Types ---
// ...existing code...
// ...existing code...
// ...existing code...
// ...existing code...
// ...existing code...
// ...existing code...
// ...existing code...
// ...existing code...


// --- Manually Defined Types ---
// ...existing code...

// ...existing code...

// ...existing code...

// ...existing code...