import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { MoreVerticalIcon } from 'lucide-react';
import React, { useState } from 'react'
import type { postDataItemType } from '../../types';
import Box from '@mui/material/Box';
import { useUserStore } from '../../userStore';
import EditPostModal from './EditPostModal';
import DeletePostModal from './DeletePostModal';
import CreateShareModal from '../share/CreateShareModal';
import { stringAvatar } from '../../utils/colorsUtil';
import { Link, useParams } from 'react-router';
import { Button, Divider } from '@mui/material';
import ShowCommentsButton from '../comments/ShowCommentsButton';


type PostItemProps = {
    post: postDataItemType;
}

export default function PostItem({ post }: PostItemProps) {
    const { type } = useParams<{ type: 'posts' | 'shares' }>()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { currentUser } = useUserStore()


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);

    };


    return (
        <Card variant="outlined" sx={{ width: 400 }}>
            {/* Cabecera del Post */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
                <Link className='flex gap-1 items-center' to={`/profile/${post.user.id}`}>
                    <Avatar {...stringAvatar(post.user.name + " " + post.user.last_name)}></Avatar>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {post.user.name} {post.user.last_name}
                    </Typography>
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* --- Botón de Compartir (para todos) --- */}
                    <CreateShareModal post={post} />
                    {/* --- Botón del Menú (solo para el dueño) --- */}
                    {currentUser!.id === post.user.id && (
                        <IconButton
                            aria-label="more"
                            onClick={handleClick}
                        >
                            <MoreVerticalIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* Contenido del Post */}
            <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2">
                    {post.content}
                </Typography>
            </CardContent>

            {/* --- Sección de Acciones --- */}
            <Divider />

            {/* Esto es para que cuando entremos a la vista de los comments , si entramos a los comentarios del post , se desaparezca el boton de llevar a los comentarios de ese post porque ya estamos ahi */}

            {type != 'posts' &&
                <ShowCommentsButton type='posts' item={post} textButton='de la publicacion' ></ShowCommentsButton>
            }

            {/* --- Componente del Menú --- */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{ paper: { style: { maxHeight: 200, width: 200 } } }}
            >
                <EditPostModal post={post} />
                <DeletePostModal post={post} />
            </Menu>
        </Card>
    )
}
