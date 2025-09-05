import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteFriendship } from "../../api/friendshipApi"
import { useParams } from "react-router"

type cancelFriendRequestButtonType = {
    idFriendship: string,
    textButton: string
}


export default function CancelFriendRequestButton({ textButton, idFriendship }: cancelFriendRequestButtonType) {
    const queryClient = useQueryClient()
    const { userId } = useParams<{ userId: string }>()

    const deleteMutation = useMutation({
        mutationFn: deleteFriendship,
        onSuccess: () => {
            console.log("Solicitud cancelada, invalidando query ['friendship',", userId, "]")
            queryClient.invalidateQueries({ queryKey: ['friendship', userId] })
        }
    })

    return (
        <button
            onClick={() => deleteMutation.mutate(idFriendship)}
            disabled={deleteMutation.isPending}
            className="flex gap-2 w-fit px-4 py-2 bg-[#FA3E3E] text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
            {textButton}
        </button>
    )
}
