import React, { useEffect, useState } from 'react'
import { handleLogout } from '../utils/authenticationUtils'
import { useNavigate } from 'react-router'
import UserProfileItem from '../components/profile/UserProfileItem'
import type { FeedResponseType,userDataForItemsArrayType, userDataType } from '../types'
import { getAllUsers } from '../api/userApi'
import { getFeeds } from '../api/feedApi'
import PostItem from '../components/post/PostItem'
import ShareItem from '../components/share/ShareItem'
import Box from '@mui/material/Box'

export default function HomePageView() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<userDataForItemsArrayType>([])
  const [feeds, setFeeds] = useState<FeedResponseType>()

  useEffect(() => {
    const getUsers = async () => {
      const feeds = await getFeeds()
      setFeeds(feeds)
      const users = await getAllUsers()
      setUsers(users!)
    }
    getUsers()
  }, [])

  return (
    <>
      <button onClick={() => handleLogout(navigate)}>cerrar sesion</button>
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
        {feeds?.map((feed) => {
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
