import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteFriendship } from "../../api/friendshipApi"
import { useParams } from "react-router"
import Button from "@mui/material/Button"

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
            console.log("Solicitud cancelada, invalidando queries.")
            // Invalida la query del estado de la amistad para actualizar los botones
            queryClient.invalidateQueries({ queryKey: ['friendship', userId]})
            // Invalida la query de la lista de amigos para actualizar la pestaña "Amigos"
            queryClient.invalidateQueries({ queryKey: ['UsersFriends', userId] })
        }
    })

    return (
        <Button
            color="error"
            variant="contained"
            onClick={() => deleteMutation.mutate(idFriendship)}
            disabled={deleteMutation.isPending}
        >
            {textButton}
        </Button>
    )
}
