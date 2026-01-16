import { useEffect, useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { useUserStore } from "../userStore";
import { getCurrentUser } from "../api/userApi";
import { type Subscription } from "@rails/actioncable";
import { actionCableService } from "../services/actionCableService";
import { useNotificationStore } from "../notificationStore";
import type { Notification } from "../types";
import { AppBar, Box, Button, colors, IconButton, Toolbar, Typography } from "@mui/material";
import { MenuIcon } from "lucide-react";
import PeopleIcon from '@mui/icons-material/People';
import ShowChatsButton from "./messages/ShowChatsButton";
import { Link } from 'react-router'
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ButtonNavbar from "./ButtonNavbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';


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
        try {
          const user = await getCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "La sesión ha expirado o el token es inválido.";
          console.error(errorMsg);
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
    const subscription: Subscription | undefined = actionCableService.createSubscription(
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
      <Box sx={{ flexGrow: 1, mb: '16px' }}>
        <AppBar position="static" elevation={2} sx={{ bgcolor: 'white', borderBottom: '1px solid #ddd' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 64 }}>
            {/* Logo y buscador */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ButtonNavbar Icon={FacebookIcon} to={'/'} />
              <ButtonNavbar Icon={PeopleIcon} to={'/friends'} />
            </Box>

            {/* Iconos de usuario */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ButtonNavbar Icon={ChatIcon} to={'/conversations'} />
              <ButtonNavbar Icon={NotificationsIcon} to={'/notifications'} />
              <ButtonNavbar Icon={AccountCircleIcon} to={'/profile/' + currentUser?.id} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  )
}