import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { LoginForm } from "../../types"
import { api } from "../../api/apiConfig"
import { handleLoginSucces } from "../../utils/authenticationUtils"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../../userStore"


function LoginView() {

    const [sizeWindow, setSizeWindow] = useState(window.innerWidth)
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginForm>()

    useEffect(() => {
        window.addEventListener('resize', () => setSizeWindow(window.innerWidth))
        return () => window.removeEventListener('resize', () => setSizeWindow(window.innerWidth))
    }, [])

    const isTiny = sizeWindow <= 400


    const onsubmit = async (data: LoginForm) => {
        try {
            const response = await api.post("/login", {
                user: {
                    email: data.email,
                    password: data.password,
                }
            })
            if (response.status === 201) {
                handleLoginSucces(response.headers.authorization.split(" ")[1])
                toast.success("Inicio de sesion exitoso", {
                    autoClose: 3000,
                    position: "top-right"
                });

                navigate("/")
            }
        } catch (error) {
            toast.error("correo o contraseña invalido")
        }
    }
    return (
        <>
            <div className="flex items-center w-full h-screen justify-center  bg-[#F0F2F5] max-md:flex-col px-8 gap-10">
                <div className="max-w-lg">
                    <h1 className="text-[#1877F2] mb-4 font-bold text-6xl w-fit max-md:w-full max-md:text-center">fakebook</h1>
                    <p className="text-2xl max-md:w-full max-md:text-center ">Fakebook te ayuda a comunicarte y compartir con las personas que forman parte de tu vida</p>
                </div>

                <div className={`h-fit ${isTiny ? "max-w-[260px]" : "w-[360px]"} bg-white py-4 px-4 shadow-xl`}>
                    <form className="w-full" onSubmit={handleSubmit(onsubmit)}>
                        <div className="flex flex-col gap-8">
                            <input type="email" className="border-1 rounded-sm p-3 border-[#D3D3D3]" placeholder="Correo electronico" {...register("email", { required: true })} />
                            <input type="password" className="border-1 rounded-sm p-3 border-[#D3D3D3]" placeholder="Contraseña" {...register("password", { required: true })} />
                            <input type="submit" className="bg-[#1877F2] text-white font-bold p-2 rounded-sm text-2xl" value="Iniciar sesion" />
                        </div>
                    </form>

                    <div className="flex flex-col items-center gap-4">
                        <a className="text-[#1877F2] w-full text-center border-b-1 border-b-[#D3D3D3] py-4 " href="/">¿Olvidaste tu contraseña?</a>

                        <button onClick={() => navigate("/register")} className="bg-[#4CAF50] text-white font-bold py-2 px-4 rounded-sm text-lg w-fit">
                            Crear cuenta nueva
                        </button>
                    </div>
                </div>
            </div>


        </>

    )
}

export default LoginView