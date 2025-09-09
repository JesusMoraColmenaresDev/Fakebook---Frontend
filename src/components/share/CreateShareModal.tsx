import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import type { postDataItemType } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useMutation } from "@tanstack/react-query";
import { createShare } from "../../api/shareApi";
import { toast } from "react-toastify";

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

type CreateShareModalProps = {
    post: postDataItemType;
}

export default function CreateShareModal({ post }: CreateShareModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const shareMutate = useMutation({
        mutationFn : createShare,
        onSuccess: () => {
            toast.success("Publicacion compartida")
        },
        onError: (error) => {
            console.error("Error al compartir la publicacion:", error);
            toast.error("Error al compartir la publicacion")
        }
    })

    const handleConfirmShare = () => {
        // Aquí irá la lógica de la mutación para compartir
        console.log("Compartiendo post:", post.id);

        shareMutate.mutate({
            content : post.content, 
            post_id : post.id
        })
        handleClose();
    };

    return (
        <>
            <IconButton aria-label="share" onClick={handleOpen}>
                <ShareIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="share-post-modal-title"
            >
                <Box sx={style}>
                    <Typography id="share-post-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        ¿Quieres compartir esta publicación?
                    </Typography>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="body2">{post.content}</Typography>
                        </CardContent>
                    </Card>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={handleConfirmShare} disabled={shareMutate.isPending} >Compartir</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}
