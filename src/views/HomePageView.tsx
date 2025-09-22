import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import UserProfileItem from '../components/profile/UserProfileItem'
import type { FeedResponseType, UserItemArrayType } from '../types'
import { getAllUsers } from '../api/userApi'
import { getFeeds, useGetFeeds } from '../api/feedApi'
import PostItem from '../components/post/PostItem'
import ShareItem from '../components/share/ShareItem'
import Box from '@mui/material/Box'
import { CircularProgress, Container, Divider, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import HistoryIcon from '@mui/icons-material/History'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import GroupIcon from '@mui/icons-material/Group'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import StorefrontIcon from '@mui/icons-material/Storefront'
import FeedIcon from '@mui/icons-material/DynamicFeed'
import EventIcon from '@mui/icons-material/Event'
import BarChartIcon from '@mui/icons-material/BarChart'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CreatePostModal from '../components/post/CreatePostModal'

const menuItems = [
  { icon: <PeopleIcon />, text: 'Amigos' },
  { icon: <HistoryIcon />, text: 'Recuerdos' },
  { icon: <BookmarkIcon />, text: 'Guardado' },
  { icon: <GroupIcon />, text: 'Grupos' },
  { icon: <OndemandVideoIcon />, text: 'Video' },
  { icon: <StorefrontIcon />, text: 'Marketplace' },
  { icon: <FeedIcon />, text: 'Feeds' },
  { icon: <EventIcon />, text: 'Eventos' },
  { icon: <BarChartIcon />, text: 'Administrador de anuncios' },
  { icon: <SportsEsportsIcon />, text: 'Jugar' },
  { icon: <ExpandMoreIcon />, text: 'Ver más' },
];

const contacts = [
  { name: 'Annie Hudson', online: true, avatar: '' },
  { name: 'Yaya Scott', online: true, avatar: '' },
  { name: 'Joji Quinn', online: true, avatar: '' },
  { name: 'Laura Arias', online: true, avatar: '' },
  { name: 'Ellixian Yuji', online: true, avatar: '' },
  { name: 'Hanna Mut Diaz', online: true, avatar: '' },
  { name: 'Brenda Paulina', online: false, avatar: '' },
  { name: 'Athena Thurman', online: true, avatar: '' },
  { name: 'Michael Montemayor', online: false, avatar: '' },
  // ...agrega más si quieres
];

export default function HomePageView() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserItemArrayType>([])
  const { feeds, isLoadingFeeds, feedsError } = useGetFeeds()

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
    <div className="bg-[#f0f2f5] min-h-screen pb-8">
  <div className="flex justify-center gap-8 px-4 pt-4 max-w-[1000px] mx-auto">
        {/* Feed */}
        <main className=" flex flex-col items-center flex-1 gap-4 rounded-2xl p-4 bg-transparent">
          <div className='flex w-full'>
            <CreatePostModal />
          </div>

          {feeds!.map((feed) => {
            switch (feed.type) {
              case 'post':
                return <PostItem post={feed.data} postInShare={false} key={feed.data.id} />;
              case 'share':
                return <ShareItem share={feed.data} key={feed.data.id} />;
              default:
                return null;
            }
          })}
        </main>

        {/* Right Sidebar */}
        {/*<aside className="w-[300px] bg-white rounded-2xl p-4 h-[calc(100vh-80px)] sticky top-[70px] self-start">
          <Typography fontWeight={600} mb={2}>Cumpleaños</Typography>
          <div className="flex items-center mb-4">
            <Avatar sx={{ bgcolor: '#f50057', mr: 1, width: 32, height: 32 }}>🎁</Avatar>
            <Typography variant="body2">Hoy es el cumpleaños de Akemi Nam y 8 personas más.</Typography>
          </div>
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={600} mb={2}>Contactos</Typography>
          <List>
            {contacts.map((contact, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <Avatar sx={{ width: 32, height: 32 }}>{contact.name[0]}</Avatar>
                </ListItemIcon>
                <ListItemText primary={contact.name} />
                {contact.online && (
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-2 inline-block" />
                )}
              </ListItem>
            ))}
          </List>
        </aside>*/}
      </div>
    </div>
  )
}