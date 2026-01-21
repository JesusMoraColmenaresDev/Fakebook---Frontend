import { z } from "zod";
import type { RegisterFormSchema } from "./userTypes";

// --- Auth Types ---
export type LoginFormType = {
    email: string,
    password: string
}

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
// Si tienes un schema para el formulario de registro, impórtalo desde userTypes.ts
// Si tienes un userDataFormType, agrégalo aquí también
