import React, { useState } from 'react'
import type { shareDataTypeForItems } from '../../types'
import Card from '@mui/material/Card'
import PostItem from '../post/PostItem'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useUserStore } from '../../userStore'
import IconButton from '@mui/material/IconButton'
import { MoreVerticalIcon } from 'lucide-react'
import Menu from '@mui/material/Menu'

type ShareItemProps = {
    share: shareDataTypeForItems;
}

export default function ShareItem({ share }: ShareItemProps) {
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
        <Card variant="outlined" key={share.id} sx={{ width: 400 }}>
            {/* Cabecera del Share, basada en PostItem */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
                <Box>
                    <Avatar>{share.user.name[0].toUpperCase()}</Avatar>
                    <Typography variant="h6" component="div">
                        {share.user.name} {share.user.last_name} 
                    </Typography>
                    <Typography>
                        Ha compartido
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* --- Botón del Menú (solo para el dueño del share) --- */}
                    {currentUser!.id === share.user.id && (
                        <IconButton
                            aria-label="more"
                            onClick={handleClick}
                        >
                            <MoreVerticalIcon />
                        </IconButton>
                    )}
                </Box>

            </Box>

            {/* Contenido del Share (el comentario) */}
            {share.content && (
                <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body2">
                        {share.content}
                    </Typography>
                </CardContent>
            )}

            {/* PostItem original envuelto */}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, pt: 0 }}>
                <PostItem post={share.post} />
            </Box>

            {/* --- Componente del Menú para el Share --- */}
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
                {/* Como se solicitó, este menú está vacío. 
                    Aquí podrían ir opciones como "Eliminar share". */}
            </Menu>
        </Card>
    )
}
