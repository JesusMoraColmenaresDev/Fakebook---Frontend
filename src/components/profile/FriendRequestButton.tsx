import { api } from "../../api/apiConfig"
import { sendRequestFriendship } from "../../api/friendshipApi";

type FriendRequestButtonProps = {
    idProfile: string
}

export default function FriendRequestButton({ idProfile }: FriendRequestButtonProps) {
    return (
        <button className="flex gap-2 w-fit px-4 py-2 bg-[#1877f2] text-white rounded-2xl" onClick={async () => sendRequestFriendship(idProfile)}>enviar solicitud de amistad</button>
    )
}
