import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { api } from "../api/apiConfig";
import { useUserStore } from "../userStore";

/**
 * Este componente actúa como la raíz de nuestras rutas.
 * Su propósito es ejecutarse UNA SOLA VEZ al cargar la aplicación
 * para intentar "rehidratar" la sesión del usuario si existe un token.
 */
export default function RootLayout() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    const rehydrateUserSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/current_user");
          setCurrentUser(response.data.data);
        } catch (error) {
          console.error("La sesión ha expirado o el token es inválido:", error);
          localStorage.removeItem("token");
          setCurrentUser(null);
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