import { useEffect, useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { api } from "../api/apiConfig";
import { useUserStore } from "../userStore";
import { getCurrentUser } from "../api/userApi";

/**
 * Este componente actúa como la raíz de nuestras rutas.
 * Su propósito es ejecutarse UNA SOLA VEZ al cargar la aplicación
 * para intentar "rehidratar" la sesión del usuario si existe un token.
 */
export default function RootLayout() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { setCurrentUser } = useUserStore();
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

  if (isInitializing) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">Cargando aplicación...</div>;
  }

  return <Outlet />;
}  