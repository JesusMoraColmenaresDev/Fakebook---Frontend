import React, { useState } from 'react'
import type { ShareType } from '../../types/shareTypes'
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
import { stringAvatar } from '../../utils/colorsUtil'
import EditShareModal from './EditShareModal'
import DeleteShareModal from './DeleteShareModal'
import { Link, useParams } from 'react-router'
import { Button, Divider } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShowCommentsButton from '../comments/ShowCommentsButton'

type ShareItemProps = {
    share: ShareType;
}

export default function ShareItem({ share }: ShareItemProps) {
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
        <Card variant="outlined" key={share.id} sx={{ minWidth: '100%', bgcolor: 'white' }}>
            {/* Cabecera del Share */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Link className='flex gap-2 items-center' to={`/profile/${share.user.id}`}>
                        <Avatar {...stringAvatar(share.user.name + " " + share.user.last_name)}></Avatar>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {share.user.name} {share.user.last_name}
                        </Typography>
                    </Link>
                    <Typography>
                        Ha compartido
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                <Link to={`/shares/${share.id}/comments`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardContent sx={{ pt: 0 }}>
                        <Typography variant="body2">
                            {share.content}
                        </Typography>
                    </CardContent>
                </Link>
            )}

            {/* PostItem original envuelto */}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, pt: 0 }}>
                <PostItem post={share.post} postInShare={true} />
            </Box>

            <Divider />

            {type != 'shares' &&
                <ShowCommentsButton type='shares' item={share} textButton='del compartido' />
            }

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
                <EditShareModal share={share} />
                <DeleteShareModal share={share} />
            </Menu>
        </Card>
    )
}
