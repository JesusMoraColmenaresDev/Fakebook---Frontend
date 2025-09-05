import { z } from "zod";

const registerDataForm = z.object({
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    birthday_day: z.string(),
    birthday_month: z.string(),
    birthday_year: z.string()
})

const userData = z.object({
    id: z.string(),
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    birthday: z.date()
})

const friendshipData = z.object({
    id: z.string(),
    friend_id: z.string(),
    user_id: z.string(),
    status: z.string()
})

export type userDataFormType = z.infer<typeof registerDataForm>
export type userDataType = z.infer<typeof userData>
export type friendshipDataType = z.infer<typeof friendshipData>
export type AllfriendshipDataType = userDataType[]



export type LoginForm = {
    email: string,
    password: string
}