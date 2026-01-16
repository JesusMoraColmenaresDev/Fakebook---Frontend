import { useMutation, useQueryClient } from "@tanstack/react-query"
import { acceptFriendship } from "../../api/friendshipApi"
import { useParams } from "react-router"
import Button from "@mui/material/Button"
import { toast } from "react-toastify"

type confirmFriendRequestButton = {
    idFriendship: string
}

export default function ConfirmFriendRequestButton({ idFriendship }: confirmFriendRequestButton) {
    // 1. Obtenemos una instancia del cliente de React Query.
    const queryClient = useQueryClient()
    // 2. Obtenemos el userId de los parámetros de la URL para saber qué query invalidar.
    const { userId } = useParams<{ userId: string }>()

    // 3. Creamos la mutación.
    const acceptMutation = useMutation({
        mutationFn: acceptFriendship, // La función que se ejecutará.
        onSuccess: () => {
            // 4. Cuando la mutación sea exitosa, invalidamos la query de la amistad.
            // React Query buscará la query con esta clave (en ProfileView) y la volverá a ejecutar,
            // actualizando la UI automáticamente.
            console.log("Amistad aceptada, invalidando queries.")
            queryClient.invalidateQueries({ queryKey: ['friendship', userId] })
            // También invalidamos la lista de amigos, ya que ha cambiado.
            queryClient.invalidateQueries({ queryKey: ['UsersFriends', userId] })
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Error al aceptar la solicitud de amistad.");
        }
    })

    return (
        <Button
            variant="contained"
            onClick={() => acceptMutation.mutate(idFriendship)}
            disabled={acceptMutation.isPending} // Deshabilitamos el botón mientras la petición está en curso.
        >{"Confirmar"}</Button>
    )
}
