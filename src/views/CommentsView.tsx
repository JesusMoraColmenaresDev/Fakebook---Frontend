import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PostItem from '../components/post/PostItem';
import ShareItem from '../components/share/ShareItem';
import CommentList from '../components/comments/CommentList';
import SendComment from '../components/comments/SendComment';
import type { CommentArrayType } from '../types/commentTypes';
import type { ShareType } from '../types/shareTypes';
import type { PostType } from '../types/postTypes';
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
      <div className="flex justify-center items-center h-[80vh]">
        <CircularProgress />
      </div>
    );
  }

  // 3. Manejar estado de error o datos faltantes
  if (commentsError || itemError || !id || !type) {
    return (
      <div className="max-w-[1000px] mx-auto mt-4">
        <Typography color="error" textAlign="center">
          {commentsError?.message || itemError?.message || "No se pudo cargar la publicación o los comentarios."}
        </Typography>
      </div>
    );
  }

  return (
  <div className="max-w-[1000px] mx-auto mt-4 mb-4">
      <div className="bg-white p-4 rounded-2xl shadow">
        {/* Renderiza el Post o Share principal (cuando tengas los datos) */}
        <div className="flex flex-col items-center">
          {comments && type === 'posts' && <PostItem postInShare={false} post={item as PostType} />}
          {comments && type === 'shares' && <ShareItem share={item as ShareType} />}
        </div>

        <Divider className="my-4" />

        <SendComment type={type} id={id} />
        <CommentList comments={comments!} />
      </div>
    </div>
  );
}
