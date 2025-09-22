import React from 'react'
import type { Notification } from '../../types'
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { stringAvatar } from '../../utils/colorsUtil'
import { Link as RouterLink } from 'react-router';

export default function NotificacionItem(notification: Notification) {

  const getNotificationMessage = () => {
    switch (notification.action_type) {
      case 'new_comment':
        return 'ha comentado tu publicación.';
      case 'new_share':
        return 'ha compartido tu publicación.';
      case 'new_friendship_request':
        return 'te ha enviado una solicitud de amistad.';
      case 'accepted_friendship':
        return 'ha aceptado tu solicitud de amistad.';
      default:
        // Fallback por si llega un tipo de notificación no manejado
        return 'ha realizado una acción.';
    }
  };

  const getNotificationLink = (): string => {
    const { notifiable, actor } = notification;

    switch (notifiable.type) {
      case 'Friendship':
        // Si la notificación es sobre una amistad, nos lleva al perfil del actor.
        return `/profile/${actor.id}`;

      case 'Share':
        // Si es sobre un share, nos lleva a la vista de comentarios de ese share.
        return `/shares/${notifiable.id}/comments`;

      case 'Post':
        // Si es sobre un post, nos lleva a la vista de comentarios de ese post.
        return `/posts/${notifiable.id}/comments`;

      case 'Comment':
        // Si es sobre un comentario, usamos la información extra que nos da el backend.
        if (notifiable.commentable) {
          const parentType = notifiable.commentable.type.toLowerCase() + 's'; // 'Post' -> 'posts'
          return `/${parentType}/${notifiable.commentable.id}/comments`;
        }
        // Fallback por si algo falla
        return '#';
    }
  };

  return (
    <ListItem alignItems="flex-start" component={RouterLink} to={getNotificationLink()} sx={{ display: 'flex', alignItems: 'center', gap: 1, '&:hover': { bgcolor: 'action.hover' } }}>
      <ListItemAvatar>
        <Avatar {...stringAvatar(`${notification.actor.name} ${notification.actor.last_name}`)} />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Typography component="span" variant="body2" color="text.primary">
            <Typography component="span" fontWeight="bold">{`${notification.actor.name} ${notification.actor.last_name}`}</Typography>
            {' '}{getNotificationMessage()}
          </Typography>
        }
        secondary={new Date(notification.created_at).toLocaleString()}
      />

    </ListItem>
  )
}
