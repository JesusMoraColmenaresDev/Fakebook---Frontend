import React, { useEffect, useState } from 'react'
import { handleLogout } from '../utils/authenticationUtils'
import { useNavigate } from 'react-router'
import UserProfileItem from '../components/profile/UserProfileItem'
import { api } from '../api/apiConfig'
import type { userDataType } from '../types'
import { generateColorFromText } from '../utils/colorsUtil'

export default function HomePageView() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/users")
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  return (
    <>
      <button onClick={() => handleLogout(navigate)}>cerrar sesion</button>
      {users.map((user : userDataType) => (
        <UserProfileItem
          id={user.id}
          key={user.id}
          name={user.name + " " + user.last_name}
          profilePictureUrl="">
        </UserProfileItem>
      ))}


    </>

  )
}
