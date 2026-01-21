import { z } from "zod";

// --- Notification Schemas ---
const actionTypeSchema = z.enum([
    'new_comment',
    'new_share',
    'new_friendship_request',
    'accepted_friendship',
]);

const notifiableTypeSchema = z.enum(['Comment', 'Share', 'Friendship', 'Post']);

export const notificationSchema = z.object({
    id: z.number(),
    actor: z.object({
        id: z.number(),
        name: z.string(),
        last_name: z.string(),
    }),
    action_type: actionTypeSchema,
    read: z.boolean(),
    created_at: z.string().datetime(),
    notifiable: z.object({
        type: notifiableTypeSchema,
        id: z.number(),
        commentable: z.object({
            type: z.enum(['Post', 'Share']),
            id: z.number(),
        }).optional(),
    }),
});

export const notificationsResponseSchema = z.array(notificationSchema);

export type notificationArrayType = z.infer<typeof notificationsResponseSchema>;
export type Notification = z.infer<typeof notificationSchema>;
