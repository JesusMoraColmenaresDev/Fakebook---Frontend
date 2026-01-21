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

// --- TypeScript Types ---
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type UserItemType = z.infer<typeof UserItemSchema>;
export type UserArrayType = z.infer<typeof UserArraySchema>;
export type UserItemArrayType = z.infer<typeof UserItemArraySchema>;
