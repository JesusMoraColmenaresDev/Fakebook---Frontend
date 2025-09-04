import { api } from "./apiConfig"

export const getFriendship = async (userId: string) => {
    try {
        const statusFriendship = await api.get("/friendships/status/" + userId)
        return statusFriendship.data
    } catch (error) {
        console.log(error)

    }
}

export const sendRequestFriendship = async (idProfile: string) => {

    try {
        const response = await api.post("/friendships", {
            friendship: {
                friend_id: idProfile
            }
        })

        if(response.status === 201){
            console.log("solicitud enviada exitosamente")
        }else{
            console.log("hubo un error al enviar la solicitud")
        }
        
    } catch (error) {
        console.log(error)
    }

}
