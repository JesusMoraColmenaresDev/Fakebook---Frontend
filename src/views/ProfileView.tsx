import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'
import type { FriendshipType, UserType } from '../types'
import { useUserStore } from '../userStore'
import EditProfileButton from '../components/profile/EditProfileButton'
import FriendRequestButton from '../components/friendships/FriendRequestButton'
import { useGetUserById } from '../api/userApi'
import { useGetFriendship } from '../api/friendshipApi'
import CancelFriendRequestButton from '../components/friendships/CancelFriendRequestButton'
import ConfirmFriendRequestButton from '../components/friendships/ConfirmFriendRequestButton'
import ButtonSectionProfile from '../components/profile/ButtonSectionProfile'
import ProfilePost from '../components/profile/ProfilePost'
import ProfileFriends from '../components/profile/ProfileFriends'
import ProfileAbout from '../components/profile/ProfileAbout'
import CreatePostModal from '../components/post/CreatePostModal'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from '../utils/colorsUtil'
import ButtonSendMessage from '../components/profile/ButtonSendMessage'

export default function ProfileView() {
    const { userId } = useParams<{ userId: string }>()
    //const [friendshipProfileUser, setFriendshipWithProfileUser] = useState<friendshipDataType>()
    const { currentUser } = useUserStore()
    // 3. Determinar si estamos viendo nuestro propio perfil
    const isMyProfile = currentUser?.id.toString() === userId;

    //detectar en que seccion del perfil esta el usuario
    const [profileSection, setProfileSection] = useState('Publicaciones');

    useEffect(() => {
        setProfileSection('Publicaciones')
    }, [userId])


    const { profileUser, isLoadingUser, userError } = useGetUserById(userId!, isMyProfile)
    const { friendshipProfileUser, isLoadingFriendship, friendshipError } = useGetFriendship(userId!, isMyProfile)
    console.log(friendshipProfileUser)

    const finalProfileUser = isMyProfile ? currentUser : profileUser

    const renderFriendshipActions = () => {
        if (isMyProfile) {
            return (
                <div className='flex gap-4'>
                    <EditProfileButton />
                    <CreatePostModal></CreatePostModal>
                </div>

            );
        }

        // Si no hay una relación de amistad, mostramos el botón para enviar solicitud
        if (!friendshipProfileUser) {
            if (finalProfileUser) {
                return <div className='flex gap-2'>
                    <FriendRequestButton idProfile={finalProfileUser.id.toString()} textButton={"Agregar amigo"} />
                    <ButtonSendMessage userReceiverId={finalProfileUser!.id.toString()} />

                </div>;
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
                    return (
                        <div className='flex gap-2'>
                            <CancelFriendRequestButton idFriendship={friendshipProfileUser.id.toString()} textButton="Cancelar solicitud"></CancelFriendRequestButton>
                            <ButtonSendMessage userReceiverId={finalProfileUser!.id.toString()} />
                        </div>
                    )

                } else {
                    // Si el usuario actual es quien recibió la solicitud
                    // osea si no es el user_id , entonces sera el friendId
                    return (
                        <div className="flex gap-2">
                            <ConfirmFriendRequestButton idFriendship={friendshipProfileUser.id.toString()}></ConfirmFriendRequestButton>
                            <CancelFriendRequestButton idFriendship={friendshipProfileUser.id.toString()} textButton="Eliminar solicitud"></CancelFriendRequestButton>
                            <ButtonSendMessage userReceiverId={finalProfileUser!.id.toString()} />

                        </div>
                    );
                }
            case 'accepted':
                // TODO: Implementar la lógica para eliminar amigo
                return (
                    <div className='flex gap-2'>
                        <Box className="flex gap-2 w-fit px-4 py-2 bg-[#1877f2] text-white rounded-lg">Amigos</Box>
                        <CancelFriendRequestButton idFriendship={friendshipProfileUser.id.toString()} textButton="Eliminar de amigos"></CancelFriendRequestButton>
                        <ButtonSendMessage userReceiverId={finalProfileUser!.id.toString()} />
                    </div>
                )


        }
    };

    if (isLoadingUser || isLoadingFriendship) return <div>Cargando perfil</div>

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
                                <Avatar {...stringAvatar(finalProfileUser.name + " " + finalProfileUser.last_name)}></Avatar>
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
                            {<ButtonSectionProfile activeSection={profileSection} setActiveSection={setProfileSection} sectionName='Publicaciones'></ButtonSectionProfile>}
                            {<ButtonSectionProfile activeSection={profileSection} setActiveSection={setProfileSection} sectionName='Amigos'></ButtonSectionProfile>}
                            {<ButtonSectionProfile activeSection={profileSection} setActiveSection={setProfileSection} sectionName='Informacion'></ButtonSectionProfile>}
                        </div>
                    </div>
                </div>

                {profileSection === 'Publicaciones' &&
                    <ProfilePost userId={finalProfileUser!.id.toString()}></ProfilePost>
                }
                {profileSection === 'Amigos' &&
                    <>
                        {<ProfileFriends userId={finalProfileUser!.id.toString()}></ProfileFriends>}
                    </>

                }
                {profileSection === 'Informacion' &&
                    <ProfileAbout></ProfileAbout>
                }


            </div>
        </div >
    )
}
