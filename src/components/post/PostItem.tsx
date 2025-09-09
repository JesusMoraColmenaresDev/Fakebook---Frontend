import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { MoreVerticalIcon } from 'lucide-react';
import React, { useState } from 'react'
import type { postDataItemType } from '../../types';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { useUserStore } from '../../userStore';
import EditPostModal from './EditPostModal';
import DeletePostModal from './DeletePostModal';
import CreateShareModal from '../share/CreateShareModal';

type PostItemProps = {
    post: postDataItemType;
}

export default function PostItem({ post }: PostItemProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { userId } = useParams<{ userId: string }>();
    const { currentUser } = useUserStore()


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);

    };

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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* --- Botón del Menú (solo para el dueño) --- */}
                        {currentUser!.id === post.user.id && (
                            <IconButton
                                aria-label="more"
                                onClick={handleClick}
                            >
                                <MoreVerticalIcon />
                            </IconButton>
                        )}
                        {/* --- Botón de Compartir (para todos) --- */}
                        <CreateShareModal post={post} />
                    </Box>

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
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            style: { maxHeight: 200, width: 200 },
                        },
                    }}
                >
                    <EditPostModal post={post} />
                    <DeletePostModal post={post} />
                </Menu>


            </Card>
        </>
    )
}
