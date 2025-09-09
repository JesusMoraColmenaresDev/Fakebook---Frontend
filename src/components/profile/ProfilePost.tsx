
import { usegetUserPosts } from '../../api/postApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PostItem from '../post/PostItem'
import type { postDataItemType } from '../../types'


type ProfilePostType = {
  userId: string
}

export default function ProfilePost({ userId }: ProfilePostType) {
  const { posts, isLoadingPosts, postsError } = usegetUserPosts(userId)
 

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
        <PostItem post={post} key={post.id} />
      ))}
    </Box>
  )
}
