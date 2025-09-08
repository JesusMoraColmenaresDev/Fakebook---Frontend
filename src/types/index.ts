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

export const postData = z.object({
    id: z.number(),
    user_id: z.number(),
    content: z.string(),
    post_picture: z.string(),
    user: userDataForItems
})

export const postDataArray = z.array(postData)

export const postDataForm = z.object({
    content: z.string(),
    post_picture: z.string()
})




export const friendshipDataArray = z.array(friendshipData)



export type userDataFormType = z.infer<typeof registerDataForm>
export type userDataType = z.infer<typeof userData>
export type friendshipDataType = z.infer<typeof friendshipData>
export type AllfriendshipDataType = userDataType[]
export type userDataArrayType = z.infer<typeof userDataArray>
export type userDataForItemsArrayType = z.infer<typeof userDataForItemsArray>
export type userDataForItemsType = z.infer<typeof userDataForItems>
export type postDataFormType = z.infer<typeof postDataForm>
export type postDataItemType = z.infer<typeof postData>



export type postEditDataType = {
    postId: string,
    content: postDataItemType['content']
    post_picture: postDataItemType['post_picture']

}


export type LoginForm = {
    email: string,
    password: string
}