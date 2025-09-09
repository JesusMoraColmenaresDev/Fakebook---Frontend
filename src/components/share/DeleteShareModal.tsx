import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import type { shareDataTypeForItems } from "../../types";
// import { deleteShare } from "../../api/shareApi"; // <-- Deberás crear esta función
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useMutation } from "@tanstack/react-query";
import { deleteShare } from "../../api/shareApi";

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

type DeleteShareModalProps = {
    share: shareDataTypeForItems;
}

export default function DeleteShareModal({ share }: DeleteShareModalProps) {
    // const queryClient = useQueryClient(); // <-- Lo necesitarás para las mutaciones
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteMutation = useMutation({
        mutationFn: deleteShare,
        onSuccess: () => {
            toast.success("Compartido eliminado correctamente")
            handleClose(); // Cierro el modal por ahora
        },
        onError: (error) => {
            console.error("Error al eliminar el compartido:", error);
            toast.error("Error al eliminar el compartido")
        }
    })
    

    const handleConfirmDelete = () => {
        deleteMutation.mutate(share.id.toString())
        handleClose(); // Cierro el modal por ahora
    };



    return (
        <>
            <MenuItem sx={{ color: 'red' }} onClick={handleOpen}>
                Eliminar share
            </MenuItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-share-modal-title"
            >
                <Box sx={style}>
                    <Typography id="delete-share-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        ¿Estás seguro que quieres eliminar este share?
                    </Typography>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            {/* Muestra el contenido del share, o un texto alternativo si no tiene */}
                            <Typography variant="body2" color="text.secondary">{share.content || "Este share no tiene comentario."}</Typography>
                        </CardContent>
                    </Card>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                            Confirmar Eliminación
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}
