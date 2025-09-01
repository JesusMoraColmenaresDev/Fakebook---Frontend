import { z } from "zod";

const registerDataForm = z.object({
    name : z.string(),
    last_name : z.string(),
	email: z.string().email(),
	password: z.string().min(6),
    birthday_day : z.string(),
    birthday_month : z.string(),
    birthday_year : z.string()
})

export type userDataFormType = z.infer<typeof registerDataForm>