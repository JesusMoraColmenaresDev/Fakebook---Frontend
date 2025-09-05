import { redirect, useNavigate, type NavigateFunction } from "react-router"
import { toast } from "react-toastify"
import { useUserStore } from "../userStore"
import { api } from "../api/apiConfig"
import { queryClient } from "../main"


export const handleLoginSucces = (jwt: string) => {
    localStorage.setItem('token', jwt)
}

export const handleLogout = (navigate: NavigateFunction) => {
    localStorage.removeItem('token')
    useUserStore.getState().setCurrentUser(null);
    queryClient.clear()
    toast.success("Cierre de sesion exitoso", {
        autoClose: 3000,
        position: "top-right"
    });
    navigate("/login")
}

export const isNotLogin = async () => {
    if (!localStorage.getItem("token")) {
        return redirect("/login")
    }
}

export const isLogin = async () => {
    if (localStorage.getItem("token")) {
        return redirect("/")

    }
}
