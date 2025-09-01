import React from 'react'
import { handleLogout } from '../utils/authenticationUtils'
import { useNavigate } from 'react-router'

export default function HomePageView() {
  const navigate = useNavigate()
  return (
    <button onClick={() => handleLogout(navigate)}>cerrar sesion</button>
  )
}
