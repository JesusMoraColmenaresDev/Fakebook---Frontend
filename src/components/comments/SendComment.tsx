import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useUserStore } from '../../userStore';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../utils/colorsUtil';
import type { CreateCommentType } from '../../types';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import { createComment } from '../../api/commentApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type SendCommentProps = {
  type: CreateCommentType['type']
  id: CreateCommentType['id'];
}

type FormValues = {
  content: string;
}

export default function SendComment({ type, id }: SendCommentProps) {
  const { currentUser } = useUserStore();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', type, id] });
      toast.success("Comentario creado correctamente");
      reset();
    },
    onError: (error) => {
      console.error("Error al crear el comentario:", error);
      toast.error(error instanceof Error ? error.message : "Error al crear el comentario");
    }
  });


  const onSubmit = (data: FormValues) => {
    console.log("Enviando comentario:", data.content, "a", type, id);
    createCommentMutation.mutate({
      content: data.content,
      type: type,
      id: id
    });
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mt: 2 }}>
      {currentUser && (
        <Avatar {...stringAvatar(`${currentUser.name} ${currentUser.last_name}`)} sx={{ width: 32, height: 32, mt: 1 }} />
      )}
      <TextField
        fullWidth
        placeholder="Escribe un comentario..."
        variant="standard"
        {...register("content", { required: "El comentario no puede estar vacío" })}
        error={!!errors.content}
        helperText={errors.content?.message}
      />
      <IconButton type="submit" color="primary" disabled={isSubmitting}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}
