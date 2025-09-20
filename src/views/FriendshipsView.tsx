import { useGetAllUserFriends } from "../api/userApi"
import UserProfileItem from "../components/profile/UserProfileItem"
import { useUserStore } from "../userStore"

export default function FriendshipsView() {

    const { currentUser } = useUserStore()
    const { Friends, isLoadingFriends, friendsError } = useGetAllUserFriends(currentUser.id)

    if (isLoadingFriends) {
        return <div>Cargando amigos...</div>
    }

    if (friendsError) {
        return <div>Error al cargar la lista de amigos: {friendsError.message}</div>
    }
    
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
