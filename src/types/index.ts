import { z } from "zod";

// --- User Schemas ---
export const RegisterFormSchema = z.object({
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    birthday_day: z.string(),
    birthday_month: z.string(),
    birthday_year: z.string()
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    birthday: z.string()
});

export const UserItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    last_name: z.string(),
});

export const UserItemArraySchema = z.array(UserItemSchema);
export const UserArraySchema = z.array(UserSchema);

// --- Friendship Schemas ---
export const FriendshipSchema = z.object({
    id: z.number(),
    friend_id: z.number(),
    user_id: z.number(),
    status: z.string()
});

export const FriendshipArraySchema = z.array(FriendshipSchema);

// --- Post Schemas ---
export const PostSchema = z.object({
    id: z.number(),
    content: z.string(),
    post_picture: z.string(),
    user: UserItemSchema
});

export const PostArraySchema = z.array(PostSchema);

export const PostFormSchema = z.object({
    content: z.string(),
    post_picture: z.string()
});

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

// --- Comment Schemas ---
export const CommentSchema = z.object({
    id: z.number(),
    content: z.string(),
    commentable_type: z.union([z.literal('Post'), z.literal('Share')]),
    commentable_id: z.number(),
    user: UserItemSchema,
});
export const CommentArraySchema = z.array(CommentSchema);


// --- Message Schemas (centralized from conversationApi) ---
export const MessageSchema = z.object({
    id: z.number(),
    content: z.string(),
    user_id: z.number(),
    created_at: z.string(),
    user: UserItemSchema,
});
export const MessageArraySchema = z.array(MessageSchema);

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

// Define los posibles valores para 'action_type' basándose en tu enum de Rails.
const actionTypeSchema = z.enum([
    'new_comment',
    'new_share',
    'new_friendship_request',
    'accepted_friendship',
]);

// Define los posibles tipos de 'notifiable' basándose en los modelos polimórficos del backend.
const notifiableTypeSchema = z.enum(['Comment', 'Share', 'Friendship', 'Post']);

// Esquema para un único objeto de notificación.
export const notificationSchema = z.object({
    id: z.number(),
    actor: z.object({
        id: z.number(),
        name: z.string(),
        last_name: z.string(),
    }),
    action_type: actionTypeSchema,
    read: z.boolean(),
    created_at: z.string().datetime(), // Valida que sea un string en formato ISO 8601
    notifiable: z.object({
        type: notifiableTypeSchema,
        id: z.number(),
        commentable: z.object({
            type: z.enum(['Post', 'Share']),
            id: z.number(),
        }).optional(),
    }),
});

// Esquema para la respuesta completa del endpoint GET /notifications, que es un array.
export const notificationsResponseSchema = z.array(notificationSchema);

export type notificationArrayType = z.infer<typeof notificationsResponseSchema>;

// Exporta el tipo inferido para usarlo en tu código TypeScript.
export type Notification = z.infer<typeof notificationSchema>;

// --- TypeScript Types ---
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type UserItemType = z.infer<typeof UserItemSchema>;
export type UserArrayType = z.infer<typeof UserArraySchema>;
export type UserItemArrayType = z.infer<typeof UserItemArraySchema>;
export type FriendshipType = z.infer<typeof FriendshipSchema>;
export type PostType = z.infer<typeof PostSchema>;
export type PostFormType = z.infer<typeof PostFormSchema>;
export type ShareFormType = z.infer<typeof ShareFormSchema>;
export type ShareType = z.infer<typeof ShareSchema>;
export type FeedItemType = z.infer<typeof FeedItemSchema>;
export type FeedResponseType = z.infer<typeof FeedResponseSchema>;
export type CommentType = z.infer<typeof CommentSchema>;
export type CommentArrayType = z.infer<typeof CommentArraySchema>;
export type MessageType = z.infer<typeof MessageSchema>;
export type ConversationType = z.infer<typeof ConversationSchema>;
export type ConversationListItemType = z.infer<typeof ConversationListItemSchema>;
export type ConversationListType = z.infer<typeof ConversationListSchema>;


// --- Manually Defined Types ---
export type PostEditType = {
    postId: string,
    content: PostType['content'],
    post_picture: PostType['post_picture']
}

export type ShareEditType = {
    shareId: string,
    content: ShareType['content']
}

export type CreateCommentType = {
    type: 'posts' | 'shares';
    id: string;
    content: string;
}

export type LoginFormType = {
    email: string,
    password: string
}