import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import type { shareDataTypeForItems } from "../../types";
// import { editShare } from "../../api/shareApi"; // <-- Deberás crear esta función
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { updateShare } from "../../api/shareApi";

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

type EditShareModalProps = {
    share: shareDataTypeForItems;
}

export default function EditShareModal({ share }: EditShareModalProps) {
    // const queryClient = useQueryClient(); // <-- Lo necesitarás para las mutaciones
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<{ content: string }>({
        defaultValues: {
            content: share.content
        }
    });

    // Cada vez que el share cambie, reseteamos el formulario con su contenido.
    useEffect(() => {
        if (share) {
            reset({ content: share.content });
        }
    }, [share, reset]);

    // --- ZONA PARA TU MUTACIÓN ---
    // Aquí deberías definir tu `useMutation` para editar el share.

    const EditMutation = useMutation({
        mutationFn: updateShare,
        onSuccess: () => {
            toast.success("Compartido editado correctamente")
        },
        onError: (error) => {
            console.error("Error al editar el compartido:", error);
            toast.error("Error al editar el compartido")
        }
    })

    const onSubmit = (data: { content: string }) => {
        EditMutation.mutate({
            shareId: share.id.toString(),
            content: data.content
        })
        handleClose(); // Cierro el modal por ahora
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>
                Editar share
            </MenuItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-share-modal-title"
                aria-describedby="edit-share-modal-description"
            >
                <Box sx={style}>
                    <Typography id="edit-share-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                        Editar Share
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                id="edit-share-modal-description"
                                multiline
                                rows={4}
                                fullWidth
                                {...register("content", { required: "El contenido no puede estar vacío" })}
                                error={!!errors.content}
                                helperText={errors.content?.message}
                                autoFocus
                            />
                            <Button type="submit" variant="contained" fullWidth>
                                Guardar Cambios
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
