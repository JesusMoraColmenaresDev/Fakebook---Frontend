import { z } from "zod";
import { PostSchema } from "./postTypes";
import { UserItemSchema } from "./userTypes";

// --- Share Schemas ---
export const ShareFormSchema = z.object({
    content: z.string(),
    post_id: z.number()
});

export const ShareSchema = z.object({
    id: z.number(),
    content: z.string(),
    post: PostSchema,
    user: UserItemSchema
});

// --- TypeScript Types ---
export type ShareFormType = z.infer<typeof ShareFormSchema>;
export type ShareType = z.infer<typeof ShareSchema>;

export type ShareEditType = {
    shareId: string,
    content: ShareType['content']
}
