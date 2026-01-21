import { z } from "zod";
import { PostSchema } from "./postTypes";
import { ShareSchema } from "./shareTypes";

// --- Feed Schemas ---
const PostFeedItemSchema = z.object({
    type: z.literal('post'),
    created_at: z.string().datetime(),
    data: PostSchema,
});

const ShareFeedItemSchema = z.object({
    type: z.literal('share'),
    created_at: z.string().datetime(),
    data: ShareSchema,
});

export const FeedItemSchema = z.discriminatedUnion('type', [
    PostFeedItemSchema,
    ShareFeedItemSchema,
]);
export const FeedResponseSchema = z.array(FeedItemSchema);

// --- TypeScript Types ---
export type FeedItemType = z.infer<typeof FeedItemSchema>;
export type FeedResponseType = z.infer<typeof FeedResponseSchema>;
