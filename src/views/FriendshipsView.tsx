import { Typography } from "@mui/material"
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
            <div className='flex flex-col items-center max-w-[800px] mx-auto pt-4 px-4 gap-12'>
                <Typography variant="h4" className="font-bold">Lista de Amigos</Typography>
                <div className="gap-4 grid grid-cols-2 w-full">
                    {Friends && Friends.length > 0 ? (
                        Friends.map((friend) => (
                            <UserProfileItem key={friend.id} id={friend.id} name={friend.name} last_name={friend.last_name} />
                        ))
                    ) : (
                        // Mostramos un mensaje si no hay amigos.
                        <div>No tienes amigos para mostrar.</div>
                    )}
                </div>
            </div>
        )
    }
}
