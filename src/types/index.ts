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

export const userData = z.object({
    id: z.number(),
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    birthday: z.string()
})

export const userDataForItems = z.object({
    id: z.number(),
    name: z.string(),
    last_name: z.string(),
})

export const userDataForItemsArray = z.array(userDataForItems)

export const userDataArray = z.array(userData)

export const friendshipData = z.object({
    id: z.number(),
    friend_id: z.number(),
    user_id: z.number(),
    status: z.string()
})

export const friendshipDataArray = z.array(friendshipData)



export type userDataFormType = z.infer<typeof registerDataForm>
export type userDataType = z.infer<typeof userData>
export type friendshipDataType = z.infer<typeof friendshipData>
export type AllfriendshipDataType = userDataType[]
export type userDataArrayType = z.infer<typeof userDataArray>
export type userDataForItemsArrayType = z.infer<typeof userDataForItemsArray>
export type userDataForItemsType = z.infer<typeof userDataForItems>





export type LoginForm = {
    email: string,
    password: string
}