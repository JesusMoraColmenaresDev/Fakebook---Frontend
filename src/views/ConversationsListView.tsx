import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { Subscription } from '@rails/actioncable';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, CircularProgress, Paper, Divider } from '@mui/material';

import { useGetConversations } from '../api/conversationApi';
import { useUserStore } from '../userStore';
import { stringAvatar } from '../utils/colorsUtil';
import { actionCableService } from '../services/actionCableService';
import type { ConversationListItemType } from '../types';

export default function ConversationsListView() {
  // 1. Obtenemos los datos iniciales de la API.
  const { data: initialConversations, isLoading, isError } = useGetConversations();
  const { currentUser } = useUserStore();

  // 2. Creamos un estado local para poder actualizar las conversaciones.
  const [conversations, setConversations] = useState<ConversationListItemType[]>([]);

  // 3. Efecto para cargar las conversaciones iniciales en nuestro estado.
  useEffect(() => {
    if (initialConversations) {
      setConversations(initialConversations);
    }
  }, [initialConversations]);

  // 4. Efecto para suscribirnos al canal personal del usuario (UserChannel).
  useEffect(() => {
    // Creamos una suscripción al canal 'UserChannel'. El backend nos conectará
    // a nuestro stream privado usando el current_user.
    const sub: Subscription | undefined = actionCableService.createSubscription('UserChannel', {}, {
      received: (updatedConversation: ConversationListItemType) => {
        // Actualizamos el estado usando .map para reemplazar la conversación específica.
        // Es más legible y el .sort() posterior se encargará de moverla al principio.
        setConversations(prev =>
          prev.map(convo =>
            convo.id === updatedConversation.id ? updatedConversation : convo
          )
        );
      },
    });

    // 5. Limpiamos la suscripción cuando el componente se desmonte.
    return () => {
      sub?.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Typography color="error" textAlign="center" sx={{ mt: 4 }}>Error al cargar las conversaciones.</Typography>;
  }

  if (!conversations || conversations.length === 0) {
    return <Typography textAlign="center" sx={{ mt: 4 }}>No tienes conversaciones.</Typography>;
  }

  return (
  <div className="flex justify-center pt-4 px-4 max-w-[1000px] mx-auto">
      <div className="w-full bg-white rounded-2xl shadow-md">
        <Typography variant="h5" className="p-4 font-bold text-lg">
          Chats
        </Typography>
        <Divider />
        <List className="w-full bg-white p-0">
          {conversations
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            .map((convo) => {
              const lastMessageText = convo.last_message
                ? `${convo.last_message.user_id === currentUser?.id ? 'Tú: ' : ''}${convo.last_message.content}`
                : 'Inicia la conversación';

              return (
                <ListItem key={convo.id} component={RouterLink} to={`/conversation/${convo.id}`} sx={{ gap: 2, '&:hover': { bgcolor: 'action.hover' } }}>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(`${convo.other_user.name} ${convo.other_user.last_name}`)} />
                  </ListItemAvatar>
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ListItemText
                      primary={`${convo.other_user.name} ${convo.other_user.last_name}`}
                      secondary={<Typography component="span" variant="body2" color="text.secondary" noWrap>{lastMessageText}</Typography>}
                    />
                    {convo.unread_count > 0 && <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', bgcolor:'primary.main', height: '24px', width: '24px', color: 'white', fontSize: '12px'}}>{convo.unread_count}</Typography>}
                  </Box>
                </ListItem>
              );
            })}
        </List>
      </div>
    </div>
  );
}
