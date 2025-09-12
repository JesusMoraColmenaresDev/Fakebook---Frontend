import React from 'react'
import type { CommentDataArrayType, CommentDataType } from '../../types'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { stringAvatar } from '../../utils/colorsUtil'
import { Link } from 'react-router'

type CommentItemProps = {
    comment: CommentDataType
}

export default function CommentsItem({ comment }: CommentItemProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <Link to={`/profile/${comment.user.id}`}>
        <Avatar {...stringAvatar(`${comment.user.name} ${comment.user.last_name}`)} sx={{ width: 32, height: 32 }} />
      </Link>
      <Box sx={{ bgcolor: '#f0f2f5', borderRadius: '18px', p: '8px 12px', maxWidth: '100%' }}>
        <Link to={`/profile/${comment.user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
            {comment.user.name} {comment.user.last_name}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{comment.content}</Typography>
      </Box>
    </Box>
  )
}
