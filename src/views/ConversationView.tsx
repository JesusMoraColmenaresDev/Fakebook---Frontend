import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useForm, type SubmitHandler,  } from 'react-hook-form';
import { Subscription } from '@rails/actioncable';
import { Box, TextField, Button, Paper, Typography, CircularProgress, List, ListItem, ListItemText, Avatar } from '@mui/material';

import { actionCableService } from '../services/actionCableService';
import { useGetMessages } from '../api/conversationApi';
import type { MessageType } from '../types/messageTypes';
import { useUserStore } from '../userStore';
import { stringAvatar } from '../utils/colorsUtil';

type FormInputs = {
  content: string;
};

export default function ConversationView() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { currentUser } = useUserStore();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // 1. Obtener el historial de mensajes de la API
  const { data: initialMessages, isLoading, error } = useGetMessages(conversationId!);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormInputs>();

  // Efecto para cargar los mensajes iniciales una vez que la API responde.
  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error" textAlign="center">{error.message || "Error al cargar los mensajes."}</Typography>
      </Box>
    );
  }

  // Efecto para suscribirse al canal de Action Cable.
  useEffect(() => {
    if (!conversationId) return;

    const sub = actionCableService.createSubscription('ChatChannel', { conversation_id: conversationId }, {
      connected: () => {
        console.log(`Conectado y suscrito al canal de la conversación ${conversationId}`);
      },
      disconnected: () => {
        console.log(`Desconectado del canal de la conversación ${conversationId}`);
      },
      received: (newMessage: MessageType) => {
        // Añadimos el nuevo mensaje a nuestro estado.
        setMessages((prevMessages) =>
          // Evitamos duplicados por si el mensaje ya existe (puede pasar por latencia)
          prevMessages.find((msg) => msg.id === newMessage.id)
            ? prevMessages
            : [...prevMessages, newMessage]
        );
        console.log("Nuevo mensaje recibido:", newMessage);
      },
    });

    setSubscription(sub || null);

    // Función de limpieza para desuscribirse cuando el componente se desmonte.
    return () => {
      console.log(`Desuscribiéndose de la conversación ${conversationId}`);
      sub?.unsubscribe();
      setSubscription(null);
    };
  }, [conversationId]);

  // Efecto para hacer scroll automático hacia el último mensaje.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Función que se ejecuta al enviar el formulario.
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (data.content.trim() && subscription) {
      // Usamos el método 'speak' de nuestra suscripción para enviar el mensaje.
      subscription.perform('speak', { message: data.content });
      reset();
    }
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" textAlign="center" sx={{ mt: 4 }}>Error al cargar la conversación.</Typography>;
  }

  return (
    <Box sx={{maxHeight: '800px', display: 'flex', flexDirection: 'column', p: 2, bgcolor: '#F0F2F5' }}>
      <Paper elevation={2} sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
        <List>
          {messages.map((msg) => {
            const isCurrentUser = msg.user.id === currentUser?.id;
            return (
              <ListItem key={msg.id} sx={{ justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', order: isCurrentUser ? 1 : 0 }}>
                  {!isCurrentUser && <Avatar {...stringAvatar(`${msg.user.name} ${msg.user.last_name}`)} sx={{ width: 32, height: 32, mr: 1 }} />}
                  <Paper elevation={1} sx={{ p: 1.5, borderRadius: '20px', bgcolor: isCurrentUser ? '#0084ff' : '#e4e6eb', color: isCurrentUser ? 'white' : 'black' }}>
                    <ListItemText primary={msg.content} />
                  </Paper>
                </Box>
              </ListItem>
            );
          })}
        </List>
        <div ref={messagesEndRef} />
      </Paper>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex' }}>
        <TextField {...register('content', { required: true })} fullWidth variant="outlined" placeholder="Escribe un mensaje..." autoComplete="off" sx={{ bgcolor: 'white', borderRadius: '20px' }} />
        <Button type="submit" variant="contained" sx={{ ml: 1, borderRadius: '20px' }} disabled={isSubmitting}>Enviar</Button>
      </Box>
    </Box>
  );
}
