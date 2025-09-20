import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import type { PostType, PostFormType  } from "../../types";
import { editPost } from "../../api/postApi";
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

type EditPostModalProps = {
    post: PostType;
}

export default function EditPostModal({ post }: EditPostModalProps) {
    const { userId } = useParams<{ userId: string }>();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostFormType>({
        defaultValues: {
            content: post.content
        }
    });

    // Cada vez que el post cambie (o el modal se abra con un nuevo post),
    // reseteamos el formulario con el contenido de ese post.
    useEffect(() => {
        if (post) {
            reset({ content: post.content });
        }
    }, [post, reset]);

    const editPostMutation = useMutation({
        mutationFn: editPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts', userId] });
            queryClient.invalidateQueries({ queryKey: ['feeds'] });
            queryClient.invalidateQueries({ queryKey: ['item'] });
            handleClose();
            toast.success("Publicación editada correctamente");
        },
        onError: (error) => {
            console.error("Error al editar el post:", error);
            toast.error("Error al editar la publicación");
        }
    });

    const onSubmit = (data: PostFormType) => {

        editPostMutation.mutate({
            postId: post.id.toString(),
            content: data.content,
            post_picture: "/" // esto es por ahora ya que no tenemos imagenes todavia
        });
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>
                Editar publicacion
            </MenuItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-post-modal-title"
                aria-describedby="edit-post-modal-description"
            >
                <Box sx={style}>
                    <Typography id="edit-post-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                        Editar Publicación
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                id="edit-post-modal-description"
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
                                disabled={editPostMutation.isPending}
                            >
                                {editPostMutation.isPending ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
