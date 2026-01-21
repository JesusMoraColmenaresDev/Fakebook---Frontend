import { z } from "zod";

// --- Friendship Schemas ---
export const FriendshipSchema = z.object({
    id: z.number(),
    friend_id: z.number(),
    user_id: z.number(),
    status: z.string()
});

export const FriendshipArraySchema = z.array(FriendshipSchema);

// --- TypeScript Types ---
export type FriendshipType = z.infer<typeof FriendshipSchema>;
export type FriendshipArrayType = z.infer<typeof FriendshipArraySchema>;
