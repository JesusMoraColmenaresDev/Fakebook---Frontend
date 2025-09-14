import React, { useEffect } from 'react'
import { useNotificationStore } from '../notificationStore';
import { useGetNotifications } from '../api/notificationApi';
import NotificacionItem from '../components/notifications/NotificacionItem';
import { Box, Paper , List} from '@mui/material';


export default function NotificationsView() {
  // 1. Conectamos con el store de notificaciones
  const { notifications, hasBeenFetched, setNotifications } = useNotificationStore();

  // 2. Usamos nuestro nuevo hook de React Query.
  //    La consulta solo se ejecutará si `hasBeenFetched` es false.
  const {
    data: initialNotifications,
    isLoading,
    isError
  } = useGetNotifications(!hasBeenFetched);

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

  if (isError) {
    return <div>Error: No se pudieron cargar las notificaciones.</div>;
  }

  return (
   <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600 }}>
        <List>
          {notifications.map((notification) => (
            <NotificacionItem key={notification.id} {...notification} />
          ))}
        </List>
      </Paper>

    </Box>


  );
}
