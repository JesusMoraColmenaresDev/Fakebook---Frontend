import { useEffect, useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { useUserStore } from "../userStore";
import { getCurrentUser } from "../api/userApi";
import { actionCableService } from "../services/actionCableService";

/**
 * Este componente actúa como la raíz de nuestras rutas.
 * Su propósito es ejecutarse UNA SOLA VEZ al cargar la aplicación
 * para intentar "rehidratar" la sesión del usuario si existe un token.
 */
export default function RootLayout() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { currentUser, setCurrentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const rehydrateUserSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
        } else {
          console.error("La sesión ha expirado o el token es inválido:");
          localStorage.removeItem("token");
          setCurrentUser(null);
          navigate("/login");
        }
      }
      setIsInitializing(false);
    };

    rehydrateUserSession();
  }, []);

  // Efecto para gestionar el ciclo de vida de la conexión de Action Cable.
  useEffect(() => {
    if (currentUser) {
      // Si hay un usuario logueado, establecemos la conexión WebSocket.
      actionCableService.connect();
    }

    // La función de limpieza se ejecuta cuando el componente se desmonta
    // o cuando `currentUser` cambia. Si `currentUser` se vuelve `null` (logout),
    // la conexión se cerrará.
    return () => {
      actionCableService.disconnect();
    };
  }, [currentUser]); // Este efecto depende del estado del usuario.

  if (isInitializing) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">Cargando aplicación...</div>;
  }

  return (
    <>
      <div className="right-0 fixed h-screen">fokin sidebar</div>
      <Outlet />
    </>


  )
}  