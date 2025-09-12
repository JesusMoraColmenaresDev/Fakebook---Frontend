import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import type { postDataFormType } from "../../types";
import { createPost } from "../../api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: '50%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default function CreatePostModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { userId } = useParams<{ userId: string }>();

    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<postDataFormType>();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            // En caso de éxito, invalidamos la query de los posts para que se actualice la lista
            queryClient.invalidateQueries({ queryKey: ['feeds'] });
            queryClient.invalidateQueries({ queryKey: ['posts', userId] });
            handleClose(); // Cierra el modal
            reset(); // Limpia el formulario
            toast.success("Publicacion hecha")
        },
        onError: (error) => {
            console.error("Error al crear el post:", error);
            toast.error("Error al crear la publicacion")
        }
    });

    const onSubmit = (data: postDataFormType) => {
        if (!userId) return;
        const postData = {
            content: data.content,
            post_picture: "/" // Añadimos el valor para la imagen 
        };
        createPostMutation.mutate(postData);
    };

    return (
        <div>
            <Button
                variant="contained"
                startIcon={<Plus />}
                onClick={handleOpen}
            >
                Crear publicacion
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-post-modal-title"
                aria-describedby="create-post-modal-description"
            >
                <Box sx={style}>
                    <Typography id="create-post-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                        Crear Publicación
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                id="create-post-modal-description"
                                placeholder="¿Qué estás pensando?"
                                multiline
                                rows={4}
                                fullWidth
                                {...register("content", { required: "El contenido no puede estar vacío" })}
                                error={!!errors.content}
                                helperText={errors.content?.message}
                                autoFocus
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={createPostMutation.isPending}
                            >
                                {createPostMutation.isPending ? "Publicando..." : "Publicar"}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
