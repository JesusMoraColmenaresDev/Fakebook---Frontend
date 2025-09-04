import { api } from "./apiConfig";

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/current_user");
        if (response.status === 200) {
            return (response.data.data);
        }
    } catch (error) {
        console.error("La sesión ha expirado o el token es inválido:", error);
        localStorage.removeItem("token");
        return null
    }
}

export const getAllUsers = async () => {
    try {
        const response = await api.get("/users");
        if (response.status === 200) {
            return response.data
        }
    }
    catch (error) {
        console.log(error)
    }
}


export const getUserById = async (userId: string) => {
    try {
        const response = await api.get("/users/" + userId)
        if (response.status === 200) {
            return response.data
        }
    }
    catch (error) {
        console.log(error)
    }
}