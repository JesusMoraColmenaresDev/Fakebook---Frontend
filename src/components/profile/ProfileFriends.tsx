import React from 'react'
import { useGetAllFriendship } from '../../api/friendshipApi'
import type { AllfriendshipDataType, friendshipDataType, userDataType } from '../../types'
import { useGetAllUserFriends } from '../../api/userApi'

type profileFriendsType = {
    userId : string
}

export default function ProfileFriends({userId} : profileFriendsType) {

    
    const { Friends, isLoadingFriends, friendsError } = useGetAllUserFriends(userId)
    console.log(Friends)


    if (isLoadingFriends) {
        return <div>Cargando amigos...</div>
    }

    if (friendsError) {
        return <div>Error al cargar la lista de amigos: {friendsError.message}</div>
    }

    return (
        <>
            <div>Lista de Amigos</div>
            <div>
                {Friends && Friends.length > 0 ? (
                    Friends.map((friend) => (
                        <div key={friend.id}>{friend.name}</div>
                    ))
                ) : (
                    // Mostramos un mensaje si no hay amigos.
                    <div>No tienes amigos para mostrar.</div>
                )}
            </div>
        </>
    )
}
