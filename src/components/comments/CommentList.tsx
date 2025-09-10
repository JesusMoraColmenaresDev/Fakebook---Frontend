import React from 'react'
import type { CommentDataArrayType } from '../../types'
import CommentsItem from './CommentsItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type CommentListProps = {
    comments: CommentDataArrayType 
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {comments && comments.length > 0 ? (
        comments.map(comment => (
          <CommentsItem key={comment.id} comment={comment} />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          Aún no hay comentarios. ¡Sé el primero en comentar!
        </Typography>
      )}
    </Stack>
  )
}
