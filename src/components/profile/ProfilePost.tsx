
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PostItem from '../post/PostItem'
import type { PostType } from '../../types/postTypes'
import { useGetFeedsByUser } from '../../api/feedApi'
import ShareItem from '../share/ShareItem'


type ProfilePostType = {
  userId: string
}

export default function ProfilePost({ userId }: ProfilePostType) {
  const { feeds, isLoadingFeeds, feedsError } = useGetFeedsByUser(userId)


  if (isLoadingFeeds) return <Typography sx={{ mt: 2, textAlign: 'center' }}>Cargando publicaciones...</Typography>
  if (feedsError) return <Typography sx={{ mt: 2, color: 'error.main', textAlign: 'center' }}>{feedsError.message || "Error al cargar las publicaciones."}</Typography>
  if (!feeds || feeds.length === 0) return <Typography sx={{ mt: 2, textAlign: 'center' }}>No hay publicaciones para mostrar.</Typography>


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2, // El gap ahora se aplicará entre cada Card
      alignItems: 'center',
      mt: 2 // Un poco de margen superior para separar de las pestañas
    }}>
      {feeds!.map((feed) => {
        // El `switch` es la forma más clara y segura de manejar uniones discriminadas.
        // TypeScript sabrá el tipo de `feed.data` dentro de cada `case`.
        switch (feed.type) {
          case 'post':
            return <PostItem postInShare={false} post={feed.data} key={feed.data.id} />;
          case 'share':
            return <ShareItem share={feed.data} key={feed.data.id} />;
          default:
            return null; // Buena práctica para manejar casos inesperados.
        }
      })}
    </Box>
  )
}
