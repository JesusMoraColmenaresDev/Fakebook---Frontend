import { redirect, useNavigate, type NavigateFunction } from "react-router"
import { toast } from "react-toastify"
export const handleLoginSucces = (jwt: string) => {
    localStorage.setItem('token', jwt)
}

export const handleLogout = (navigate: NavigateFunction) => {
    localStorage.removeItem('token')
    toast.success("Cierre de sesion exitoso", {
        autoClose: 3000,
        position: "top-right"
    });
    navigate("/login")
}

export const isNotLogin = () => {
    if (!localStorage.getItem("token")) {
        return redirect("/login")
    }
}

export const isLogin = () => {
    if (localStorage.getItem("token")) {
        return redirect("/")
    }
}
