import React, { useEffect, useState } from 'react'
import { Await, useParams } from 'react-router'
import type { userDataType } from '../types'
import { useUserStore } from '../userStore'
import { isAxiosError } from 'axios'
import { api } from '../api/apiConfig'

export default function ProfileView() {

    const { userId } = useParams<{ userId: string }>()
    const [ProfileUser, setProfileUser] = useState<userDataType | null>(null)
    const { currentUser } = useUserStore()

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 3. Determinar si estamos viendo nuestro propio perfil
    const isMyProfile = currentUser?.id.toString() === userId;

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (isMyProfile) {
                setProfileUser(useUserStore.getState().currentUser)
                setIsLoading(false)
                setError(null);
            } else {
                try {
                    setIsLoading(true);
                    const response = await api.get("/users/" + userId)
                    if (response.status === 200) {
                        setProfileUser(response.data)
                        setIsLoading(false)
                        setError(null);
                    }

                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error)
                        setIsLoading(true);
                        setError(error.message)
                    }
                }
            }
        }
        fetchUserProfile()
    }, [userId, currentUser, isMyProfile])

    if (isLoading) return <div>CARGANDO...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="min-h-screen bg-[#F0F2F5]">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-b-lg shadow-sm">
                    {/* Profile Info Section */}
                    <div className="px-6 pb-4">
                        <div className="flex items-end gap-6 pt-6">
                            {/* Profile Picture */}
                            <img
                                className="w-[168px] h-[168px] rounded-full object-cover border-4 border-white"
                                src="./vite.svg"
                                alt="Foto de perfil de Juan Pérez"
                            />

                            {/* Profile Details */}
                            <div className="flex-1 pb-4">
                                <h1 className="text-3xl font-bold mb-2">{ProfileUser?.name + " " + ProfileUser?.last_name}</h1>
                                <p className="opacity-75 mb-3">{"cumpleaños : " + ProfileUser?.birthday}</p>
                                <div className="flex items-center gap-3">
                                    {isMyProfile && "MI FOKIN PERFIL"}
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
