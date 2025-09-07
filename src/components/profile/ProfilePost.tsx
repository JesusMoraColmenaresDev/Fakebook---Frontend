import React, { useEffect } from 'react'
import CreatePostModal from '../post/CreatePostModal'
import { getUserPosts, usegetUserPosts } from '../../api/postApi'
import { useParams } from 'react-router'
import { useGetAllUserFriends } from '../../api/userApi'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

type ProfilePostType = {
  userId: string
}

export default function ProfilePost({ userId }: ProfilePostType) {
  const { posts, isLoadingPosts, postsError } = usegetUserPosts(userId)
  console.log(posts)

  if (isLoadingPosts) return <Typography sx={{ mt: 2, textAlign: 'center' }}>Cargando publicaciones...</Typography>
  if (postsError) return <Typography sx={{ mt: 2, color: 'error.main', textAlign: 'center' }}>Error al cargar las publicaciones.</Typography>
  if (!posts || posts.length === 0) return <Typography sx={{ mt: 2, textAlign: 'center' }}>No hay publicaciones para mostrar.</Typography>

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2, // El gap ahora se aplicará entre cada Card
      alignItems: 'center',
      mt: 2 // Un poco de margen superior para separar de las pestañas
    }}>
      {posts?.map((post) => (
        <Card key={post.id} sx={{ width: '100%', maxWidth: 600 , height: '100%', minHeight: 200}}>
          <CardContent>
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
              {post.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
