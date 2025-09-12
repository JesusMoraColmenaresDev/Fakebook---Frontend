import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PostItem from '../components/post/PostItem';
import ShareItem from '../components/share/ShareItem';
import CommentList from '../components/comments/CommentList';
import SendComment from '../components/comments/SendComment';
import type { CommentDataArrayType, postDataItemType, shareDataTypeForItems } from '../types';
import { Divider } from '@mui/material';
import { useGetComments, useGetItem } from '../api/commentApi';
import { useGetPost } from '../api/postApi';

export default function CommentsView() {
  // 1. Obtener parámetros de la URL
  const { type, id } = useParams<{ type: 'posts' | 'shares', id: string }>();

  const { comments, isLoadingComments, commentsError } = useGetComments(type!, id!);
  const { item, isLoadingItem, itemError } = useGetItem(type!, id!)

  // 2. Manejar estado de carga
  if (isLoadingComments || isLoadingItem) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 3. Manejar estado de error o datos faltantes
  if (commentsError || !id || !type) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography color="error" textAlign="center">No se pudo cargar la publicación o los comentarios.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2, boxShadow: 1 }}>
        {/* Renderiza el Post o Share principal (cuando tengas los datos) */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          {comments && type === 'posts' && <PostItem post={item as postDataItemType} />}
          {comments && type === 'shares' && <ShareItem share={item as shareDataTypeForItems} />}
        </Box>


        <Divider sx={{ my: 2 }} />

        <SendComment type={type} id={id} />
        <CommentList comments={comments!} />
      </Box>
    </Container>
  );
}
