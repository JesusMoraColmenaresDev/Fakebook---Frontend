import { Box, Button } from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router'
import type { ShareType } from '../../types/shareTypes'
import type { PostType } from '../../types/postTypes'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


type ShowCommentsButtonTypes = {
    type: 'posts' | 'shares',
    item : PostType | ShareType,
    textButton : string
}


export default function ShowCommentsButton({type ,item, textButton} : ShowCommentsButtonTypes) {
    return (
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to={`/${type}/${item.id}/comments`} style={{ textDecoration: 'none', width: '100%' }}>
                <Button startIcon={<ChatBubbleOutlineIcon />} fullWidth sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}>
                    Ver Comentarios {textButton}
                </Button>
            </Link>
        </Box>
    )
}
