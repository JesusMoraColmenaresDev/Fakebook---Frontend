import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { MoreVerticalIcon } from 'lucide-react';
import React, { useState } from 'react'
import type { postDataItemType } from '../../types';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../../api/postApi';
import { queryClient } from '../../main';
import { useParams } from 'react-router';
import { useUserStore } from '../../userStore';
import { toast } from 'react-toastify';
import EditPostModal from './EditPostModal';

type PostItemProps = {
    post: postDataItemType;
}

export default function PostItem({ post }: PostItemProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentPostId, setCurrentPostId] = useState<null | number>(null);
    const open = Boolean(anchorEl);
    const { userId } = useParams<{ userId: string }>();
    const { currentUser } = useUserStore()


    const handleClick = (event: React.MouseEvent<HTMLElement>, postId: number) => {
        setAnchorEl(event.currentTarget);
        setCurrentPostId(postId);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setCurrentPostId(null);
    };

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            handleClose()
            queryClient.invalidateQueries({ queryKey: ['posts', userId] })
            toast.success("Publicacion eliminada correctamente")
        }
    })

    const handleDeletePost = () => {
        deleteMutation.mutate(post.id.toString())
        handleClose()
    }

    if (deleteMutation.isPending) return (
        <p>Eliminando publicacion</p>
    )
    return (
        <>
            <Card key={post.id} sx={{ width: 400 }}>
                {/* Cabecera del Post */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
                    <Box>
                        <Avatar>{post.user.name[0].toUpperCase()}</Avatar>
                        <Typography variant="h6" component="div">
                            {post.user.name} {post.user.last_name}
                        </Typography>
                    </Box>
                    {/* --- Botón del Menú --- */}
                    {currentUser!.id === post.user.id && (
                        <IconButton
                            aria-label="more"
                            onClick={(e) => handleClick(e, post.id)}
                        >
                            <MoreVerticalIcon />
                        </IconButton>
                    )}

                </Box>

                {/* Contenido del Post */}
                <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body2">
                        {post.content}
                    </Typography>
                </CardContent>

                {/* --- Componente del Menú --- */}

                <Menu
                    anchorEl={anchorEl}
                    open={open && currentPostId === post.id}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            style: { maxHeight: 200, width: 200 },
                        },
                    }}
                >
                    <EditPostModal post={post} />
                    <MenuItem sx={{ color: 'red' }} onClick={handleDeletePost}>
                        Eliminar publicacion
                    </MenuItem>
                </Menu>
            </Card>
        </>
    )
}


