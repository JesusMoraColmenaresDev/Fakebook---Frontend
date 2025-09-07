import { useGetAllUserFriends } from '../../api/userApi'
import UserProfileItem from './UserProfileItem'

type profileFriendsType = {
    userId: string
}

export default function ProfileFriends({ userId }: profileFriendsType) {


    const { Friends, isLoadingFriends, friendsError } = useGetAllUserFriends(userId)

    if (isLoadingFriends) {
        return <div>Cargando amigos...</div>
    }

    if (friendsError) {
        return <div>Error al cargar la lista de amigos: {friendsError.message}</div>
    }

    const listFriends = () => {
        if (Friends) {
            return (
                <div className='flex flex-1 w-full gap-4'>
                    {Friends && Friends.length > 0 ? (
                        Friends.map((friend) => (
                            <UserProfileItem key={friend.id} id={friend.id} name={friend.name} last_name={friend.last_name} />
                        ))
                    ) : (
                        // Mostramos un mensaje si no hay amigos.
                        <div>No tienes amigos para mostrar.</div>
                    )}
                </div>
            )
        }
    }
    return (
        <>
            {listFriends()}
        </>
    )
}
