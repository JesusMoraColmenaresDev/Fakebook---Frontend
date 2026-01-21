import { z } from "zod";
import { UserItemSchema } from "./userTypes";

// --- Message Schemas ---
export const MessageSchema = z.object({
    id: z.number(),
    content: z.string(),
    user_id: z.number(),
    created_at: z.string(),
    user: UserItemSchema,
});
export const MessageArraySchema = z.array(MessageSchema);

// --- TypeScript Types ---
export type MessageType = z.infer<typeof MessageSchema>;
export type MessageArrayType = z.infer<typeof MessageArraySchema>;
