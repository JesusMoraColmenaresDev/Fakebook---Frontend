import { z } from "zod";
import { UserItemSchema } from "./userTypes";

// --- Post Schemas ---
export const PostSchema = z.object({
    id: z.number(),
    content: z.string(),
    post_picture: z.string(),
    user: UserItemSchema,
});

export const PostArraySchema = z.array(PostSchema);

export const PostFormSchema = z.object({
    content: z.string(),
    post_picture: z.string()
});

// --- TypeScript Types ---
export type PostType = z.infer<typeof PostSchema>;
export type PostArrayType = z.infer<typeof PostArraySchema>;
export type PostFormType = z.infer<typeof PostFormSchema>;

export type PostEditType = {
    postId: string,
    content: PostType['content'],
    post_picture: PostType['post_picture']
}
