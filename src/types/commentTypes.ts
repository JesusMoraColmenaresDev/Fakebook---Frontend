import { z } from "zod";
import { UserItemSchema } from "./userTypes";

// --- Comment Schemas ---
export const CommentSchema = z.object({
    id: z.number(),
    content: z.string(),
    commentable_type: z.union([z.literal('Post'), z.literal('Share')]),
    commentable_id: z.number(),
    user: UserItemSchema,
});
export const CommentArraySchema = z.array(CommentSchema);

// --- TypeScript Types ---
export type CommentType = z.infer<typeof CommentSchema>;
export type CommentArrayType = z.infer<typeof CommentArraySchema>;

export type CreateCommentType = {
    type: 'posts' | 'shares';
    id: string;
    content: string;
}
