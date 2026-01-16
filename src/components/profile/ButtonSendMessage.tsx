import React from 'react'
import Button from '@mui/material/Button';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useCreateOrGetConversation } from '../../api/conversationApi';
import { toast } from 'react-toastify';

type ButtonSendMessageProps = {
  userReceiverId: string;
};

export default function ButtonSendMessage({ userReceiverId }: ButtonSendMessageProps) {
  // Usamos el hook de mutación que creamos.
  const { mutate, isPending } = useCreateOrGetConversation();

  const handleSendMessage = () => {
    mutate(userReceiverId, {
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "No se pudo iniciar la conversación.");
      }
    });
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
