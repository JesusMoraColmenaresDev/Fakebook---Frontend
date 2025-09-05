import React, { use, useEffect, useState } from 'react'
import { Await, NavLink, Outlet, useParams } from 'react-router'
import type { friendshipDataType, userDataType } from '../types'
import { useUserStore } from '../userStore'
import { isAxiosError } from 'axios'
import { api } from '../api/apiConfig'
import EditProfileButton from '../components/profile/EditProfileButton'
import { generateColorFromText } from '../utils/colorsUtil'
import FriendRequestButton from '../components/friendships/FriendRequestButton'
import { getUserById, useGetUserById } from '../api/userApi'
import { getFriendship, useGetFriendship } from '../api/friendshipApi'
import CancelFriendRequestButton from '../components/friendships/CancelFriendRequestButton'
import ConfirmFriendRequestButton from '../components/friendships/ConfirmFriendRequestButton'
import ButtonSectionProfile from '../components/profile/ButtonSectionProfile'

export default function ProfileView() {
    const { userId } = useParams<{ userId: string }>()
    //const [friendshipProfileUser, setFriendshipWithProfileUser] = useState<friendshipDataType>()
    const { currentUser } = useUserStore()
    // 3. Determinar si estamos viendo nuestro propio perfil
    const isMyProfile = currentUser?.id.toString() === userId;

    //detectar en que seccion del perfil esta el usuario
    const [profileSection, setProfileSection] = useState('publicaciones');


    const { profileUser, isLoadingUser, userError } = useGetUserById(userId!, isMyProfile)
    const { friendshipProfileUser, isLoadingFriendship, friendshipError } = useGetFriendship(userId!, isMyProfile)


    const finalProfileUser = isMyProfile ? currentUser : profileUser


    const renderFriendshipActions = () => {
        if (isMyProfile) {
            return <EditProfileButton />;
        }

        // Si no hay una relación de amistad, mostramos el botón para enviar solicitud
        if (!friendshipProfileUser) {
            if (finalProfileUser) {
                return <FriendRequestButton idProfile={finalProfileUser.id} textButton={"Agregar amigo"} />;
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
                    return <CancelFriendRequestButton idFriendship={friendshipProfileUser.id} textButton="Cancelar solicitud"></CancelFriendRequestButton>
                } else {
                    // Si el usuario actual es quien recibió la solicitud
                    // osea si no es el user_id , entonces sera el friendId
                    return (
                        <div className="flex gap-2">
                            <ConfirmFriendRequestButton idFriendship={friendshipProfileUser.id}></ConfirmFriendRequestButton>
                            <CancelFriendRequestButton idFriendship={friendshipProfileUser.id} textButton="Eliminar solicitud"></CancelFriendRequestButton>
                        </div>
                    );
                }
            case 'accepted':
                // TODO: Implementar la lógica para eliminar amigo
                return (
                    <div className='flex gap-2'>
                        <div className="flex gap-2 w-fit px-4 py-2 bg-[#1877f2] text-white rounded-lg">Amigos</div>
                        <CancelFriendRequestButton idFriendship={friendshipProfileUser.id} textButton="Eliminar de amigos"></CancelFriendRequestButton>
                    </div>
                )


        }
    };

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

                            {finalProfileUser &&
                                <div className={`w-[120px] h-[100px] rounded-full text-4xl p-2 flex items-center justify-center text-white`} style={{ backgroundColor: generateColorFromText(finalProfileUser.name) }}>
                                    {finalProfileUser.name.split(" ")[0][0].toUpperCase()}
                                </div>
                            }
                            {/* Profile Details */}
                            <div className="flex justify-between w-full h-full">
                                <div className='flex-col items-center h-full'>
                                    <p className="text-3xl font-bold mb-2">{finalProfileUser?.name + " " + finalProfileUser?.last_name}</p>
                                    <p className="opacity-75 mb-3">{"cumpleaños : " + finalProfileUser?.birthday}</p>
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
                            {<ButtonSectionProfile to='.' activeSection={profileSection} setActiveSection={setProfileSection} sectionName='Publicaciones'></ButtonSectionProfile>}
                            {<ButtonSectionProfile to="friends" activeSection={profileSection} setActiveSection={setProfileSection} sectionName='Amigos'></ButtonSectionProfile>}
                            {<ButtonSectionProfile to="about" activeSection={profileSection} setActiveSection={setProfileSection} sectionName='Informacion'></ButtonSectionProfile>}
                        </div>
                    </div>
                </div>

                <Outlet />
            </div>
        </div >
    )
}
