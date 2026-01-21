import { z } from "zod";
import { UserItemSchema } from "./userTypes";

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
    last_message: LastMessageSchema.nullable(),
    unread_count: z.number(),
    updated_at: z.string(),
});
export const ConversationListSchema = z.array(ConversationListItemSchema);

// --- TypeScript Types ---
export type ConversationType = z.infer<typeof ConversationSchema>;
export type ConversationArrayType = z.infer<typeof ConversationArraySchema>;
export type ConversationListItemType = z.infer<typeof ConversationListItemSchema>;
export type ConversationListType = z.infer<typeof ConversationListSchema>;
