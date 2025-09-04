import React, { use, useEffect, useState } from 'react'
import { Await, useParams } from 'react-router'
import type { friendshipDataType, userDataType } from '../types'
import { useUserStore } from '../userStore'
import { isAxiosError } from 'axios'
import { api } from '../api/apiConfig'
import EditProfileButton from '../components/profile/EditProfileButton'
import { generateColorFromText } from '../utils/colorsUtil'
import FriendRequestButton from '../components/profile/FriendRequestButton'
import { getUserById } from '../api/userApi'
import { getFriendship } from '../api/friendshipApi'

export default function ProfileView() {

    const { userId } = useParams<{ userId: string }>()
    const [ProfileUser, setProfileUser] = useState<userDataType | null>(null)
    const [friendshipProfileUser, setFriendshipWithProfileUser] = useState<friendshipDataType>()
    const { currentUser } = useUserStore()

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 3. Determinar si estamos viendo nuestro propio perfil
    const isMyProfile = currentUser?.id.toString() === userId;

    const renderFriendshipActions = () => {
        if (isMyProfile) {
            return <EditProfileButton />;
        }

        // Si no hay una relación de amistad, mostramos el botón para enviar solicitud
        if (!friendshipProfileUser) {
            if (ProfileUser) {
                return <FriendRequestButton idProfile={ProfileUser.id} />;
            }
            return null;
        }

        const { status, user_id } = friendshipProfileUser;
        const currentUserId = currentUser?.id.toString();

        switch (status) {
            case 'pending':
                // Si el usuario actual es quien envió la solicitud
                if (currentUserId === user_id.toString()) {
                    // TODO: Implementar la lógica para cancelar la solicitud
                    return <button className="flex gap-2 w-fit px-4 py-2 bg-gray-500 text-white rounded-lg">Cancelar Solicitud</button>;
                } else {
                    // Si el usuario actual es quien recibió la solicitud
                    // TODO: Implementar la lógica para aceptar/rechazar
                    return (
                        <div className="flex gap-2">
                            <button className="flex gap-2 w-fit px-4 py-2 bg-[#1877f2] text-white rounded-lg">Confirmar</button>
                            <button className="flex gap-2 w-fit px-4 py-2 bg-gray-300 text-black rounded-lg">Eliminar solicitud</button>
                        </div>
                    );
                }
            case 'accepted':
                // TODO: Implementar la lógica para eliminar amigo
                return <button className="flex gap-2 w-fit px-4 py-2 bg-gray-500 text-white rounded-lg">Amigos</button>;
            default:
                // Para otros estados como 'declined', 'cancelled', o si no hay amistad, se podría volver a mostrar el botón de agregar.
                return ProfileUser ? <FriendRequestButton idProfile={ProfileUser.id} /> : null;
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (isMyProfile) {
                setProfileUser(useUserStore.getState().currentUser)
                setIsLoading(false)
                setError(null);
            } else {
                setIsLoading(true);
                const user = await getUserById(userId!)
                if (user) {
                    setProfileUser(user)
                    setIsLoading(false)
                    setError(null);
                }

            }
        }

        const fetchUserFriendship = async () => {
            if (!isMyProfile){
                const friendship = await getFriendship(userId!)
                if (friendship) {
                    setFriendshipWithProfileUser(friendship)
                }
            }
        }
        fetchUserProfile()
        fetchUserFriendship()

    }, [userId, currentUser, isMyProfile])

    if (isLoading) return <div>CARGANDO...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="min-h-screen bg-[#F0F2F5]">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-b-lg shadow-sm">
                    {/* Profile Info Section */}
                    <div className="px-6 pb-4">
                        <div className="flex  items-center gap-6 pt-6">
                            {/* Profile Picture 
                            <img
                                className="w-[168px] h-[168px] rounded-full object-cover border-4 border-white"
                                src="./vite.svg"
                                alt="Foto de perfil de Juan Pérez"
                            />*/
                            }

                            {ProfileUser &&
                                <div className={`w-[120px] h-[100px] rounded-full text-4xl p-2 flex items-center justify-center text-white`} style={{ backgroundColor: generateColorFromText(ProfileUser.name) }}>
                                    {ProfileUser.name.split(" ")[0][0].toUpperCase()}
                                </div>
                            }
                            {/* Profile Details */}
                            <div className="flex justify-between w-full h-full">
                                <div className='flex-col items-center h-full'>
                                    <p className="text-3xl font-bold mb-2">{ProfileUser?.name + " " + ProfileUser?.last_name}</p>
                                    <p className="opacity-75 mb-3">{"cumpleaños : " + ProfileUser?.birthday}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {renderFriendshipActions()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-t border-gray-200">
                        <div className="flex px-6">
                            <button className="px-4 py-4 text-[#1877f2] border-b-2 border-[#1877f2] font-semibold">
                                Publicaciones
                            </button>
                            <button className="px-4 py-4 text-gray-600 hover:bg-gray-100 font-semibold">Información</button>
                            <button className="px-4 py-4 text-gray-600 hover:bg-gray-100 font-semibold">Amigos</button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex gap-6 mt-6">
                    {/* Left Sidebar */}
                    <div className="w-80">
                    </div>

                    {/* Main Feed */}
                    <div className="flex-1">

                    </div>
                </div>
            </div>
        </div>
    )
}
