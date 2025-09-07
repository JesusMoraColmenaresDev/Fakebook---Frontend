import React, { useEffect, useState } from 'react'
import { handleLogout } from '../utils/authenticationUtils'
import { useNavigate } from 'react-router'
import UserProfileItem from '../components/profile/UserProfileItem'
import { api } from '../api/apiConfig'
import type { userDataArrayType, userDataForItemsArrayType, userDataType } from '../types'
import { generateColorFromText } from '../utils/colorsUtil'
import { getAllUsers } from '../api/userApi'

export default function HomePageView() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<userDataForItemsArrayType>([])

  useEffect(() => {
    const getUsers = async () => {
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


    </>

  )
}
