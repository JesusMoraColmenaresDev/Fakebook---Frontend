import { useEffect, useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { useUserStore } from "../userStore";
import { getCurrentUser } from "../api/userApi";
import { type Subscription } from "@rails/actioncable";
import { actionCableService } from "../services/actionCableService";
import { useNotificationStore } from "../notificationStore";
import type { Notification } from "../types";

/**
 * Este componente actúa como la raíz de nuestras rutas.
 * Su propósito es ejecutarse UNA SOLA VEZ al cargar la aplicación
 * para intentar "rehidratar" la sesión del usuario si existe un token.
 */
export default function RootLayout() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { currentUser, setCurrentUser } = useUserStore();
  const { addNotification } = useNotificationStore();
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

  // Efecto para suscribirse al canal de notificaciones.
  useEffect(() => {
    // La suscripción solo se crea si hay un usuario. Si no, no hacemos nada.
    if (!currentUser) return;

    // 1. Creamos la suscripción al canal de notificaciones.
    const subscription : Subscription | undefined = actionCableService.createSubscription(
      'NotificationsChannel',
      {}, // No se necesitan parámetros extra, el backend identifica al usuario.
      {
        connected: () => {
          console.log('Conectado al canal de notificaciones.');
        },
        disconnected: () => {
          console.log('Desconectado del canal de notificaciones.');
        },
        received: (notification: Notification) => {
          console.log('Nueva notificación recibida:', notification);
          addNotification(notification);
        },
      }
    );

    // 2. La función de limpieza se desuscribe del canal cuando el usuario hace logout.
    return () => {
      subscription?.unsubscribe();
    };
  }, [currentUser]); // Este efecto también depende del estado del usuario.

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