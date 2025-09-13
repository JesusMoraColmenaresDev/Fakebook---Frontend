import React, { useEffect, useState } from 'react'
import { handleLogout } from '../utils/authenticationUtils'
import { useNavigate } from 'react-router'
import UserProfileItem from '../components/profile/UserProfileItem'
import type { FeedResponseType, UserItemArrayType } from '../types'
import { getAllUsers } from '../api/userApi'
import { getFeeds, useGetFeeds } from '../api/feedApi'
import PostItem from '../components/post/PostItem'
import ShareItem from '../components/share/ShareItem'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'
import ShowChatsButton from '../components/messages/ShowChatsButton'

export default function HomePageView() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserItemArrayType>([])
  const {feeds, isLoadingFeeds, feedsError} = useGetFeeds()

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers()
      setUsers(users!)
    }
    getUsers()
  }, [])

  if (isLoadingFeeds) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <button onClick={() => handleLogout(navigate)}>cerrar sesion</button>
      <ShowChatsButton></ShowChatsButton>
      {users.map((user) => (
        <UserProfileItem
          key={user.id}
          {...user}
        >
        </UserProfileItem>
      ))}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          mt: 2
        }}
      >
        {feeds!.map((feed) => {
          // El `switch` es la forma más clara y segura de manejar uniones discriminadas.
          // TypeScript sabrá el tipo de `feed.data` dentro de cada `case`.
          switch (feed.type) {
            case 'post':
              return <PostItem post={feed.data} key={feed.data.id} />;
            case 'share':
              return <ShareItem share={feed.data} key={feed.data.id} />;
            default:
              return null; // Buena práctica para manejar casos inesperados.
          }
        })}
      </Box>



    </>
  )
}
