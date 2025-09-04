import { api } from "../../api/apiConfig"

type FriendRequestButtonProps = {
    idProfile: string | number;
}

export default function FriendRequestButton({ idProfile }: FriendRequestButtonProps) {
    const sendRequestFriend = async() => {
        const response = await api.post("/friendships", {
            friendship: {
                friend_id:idProfile
            }
        })

        //const response = await api.get("/friendships?status=pending")
        console.log(response)
    }


    return (
        <button onClick={sendRequestFriend}>enviar solicitud de amistad</button>
    )
}
