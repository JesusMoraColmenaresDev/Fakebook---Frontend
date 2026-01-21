import React, { useEffect } from 'react'
import { useNotificationStore } from '../notificationStore';
import { useGetNotifications } from '../api/notificationApi';
import NotificacionItem from '../components/notifications/NotificacionItem';
import { Box, Paper , List} from '@mui/material';


export default function NotificationsView() {
  // 1. Conectamos con el store de notificaciones
  const { notifications, hasBeenFetched, setNotifications } = useNotificationStore();

  console.log("Notificaciones en el store:", notifications);
  // 2. Usamos nuestro nuevo hook de React Query.
  //    La consulta solo se ejecutará si `hasBeenFetched` es false.
  const {
    data: initialNotifications,
    isLoading,
    error
  } = useGetNotifications(!hasBeenFetched);

  console.log("Notificaciones obtenidas de la API:", initialNotifications);

  // 3. Efecto para sincronizar los datos de React Query con nuestro store de Zustand.
  //    Esto solo se ejecuta cuando la llamada a la API es exitosa y nos devuelve datos.
  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications, setNotifications]);

  // 4. Renderizado condicional gestionado por React Query
  if (isLoading) {
    return <div>Cargando notificaciones...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error.message || "Error: No se pudieron cargar las notificaciones."}</div>;
  }

  return (
  <div className="flex justify-center pt-4 px-4 max-w-[1000px] mx-auto">
      <div className="w-full bg-white rounded-2xl shadow-md">
        <List>
          {notifications.map((notification) => (
            <NotificacionItem key={notification.id} {...notification} />
          ))}
        </List>
      </div>
    </div>


  );
}
