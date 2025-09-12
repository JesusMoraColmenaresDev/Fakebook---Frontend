import React from 'react'
import Button from '@mui/material/Button';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useCreateOrGetConversation } from '../../api/conversationApi';

type ButtonSendMessageProps = {
  userReceiverId: string;
};

export default function ButtonSendMessage({ userReceiverId }: ButtonSendMessageProps) {
  // Usamos el hook de mutación que creamos.
  const { mutate, isPending } = useCreateOrGetConversation();

  const handleSendMessage = () => {
    // Al hacer clic, ejecutamos la mutación con el ID del receptor.
    mutate(userReceiverId);
  };

  return (
    <Button
      startIcon={<NearMeIcon />}
      onClick={handleSendMessage}
      disabled={isPending}
    >
      {isPending ? 'Iniciando...' : 'Enviar mensaje'}
    </Button>
  );
}
