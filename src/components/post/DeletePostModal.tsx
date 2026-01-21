import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import type { PostType } from "../../types/postTypes";
import { deletePost } from "../../api/postApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: '500px' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

type DeletePostModalProps = {
    post: PostType;
}

export default function DeletePostModal({ post }: DeletePostModalProps) {
    const { userId } = useParams<{ userId: string }>();
    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries({ queryKey: ['posts', userId] });
            queryClient.invalidateQueries({ queryKey: ['feeds'] });
            queryClient.invalidateQueries({ queryKey: ['item'] });
            if (location.pathname.includes("/comments")) {
                navigate("/")
            }
            toast.success("Publicación eliminada correctamente");
        },
        onError: (error) => {
            console.error("Error al eliminar el post:", error);
            toast.error(error instanceof Error ? error.message : "Error al eliminar la publicación");
        }
    });

    const handleConfirmDelete = () => {
        deleteMutation.mutate(post.id.toString());
    };

    return (
        <>
            <MenuItem sx={{ color: 'red' }} onClick={handleOpen}>
                Eliminar publicacion
            </MenuItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-post-modal-title"
            >
                <Box sx={style}>
                    <Typography id="delete-post-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        ¿Estás seguro que quieres eliminar esta publicación?
                    </Typography>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">{post.content}</Typography>
                        </CardContent>
                    </Card>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={handleClose} disabled={deleteMutation.isPending}>Cancelar</Button>
                        <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={deleteMutation.isPending}>
                            {deleteMutation.isPending ? "Eliminando..." : "Confirmar Eliminación"}
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}
