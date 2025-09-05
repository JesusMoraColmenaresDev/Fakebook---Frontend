import { useMutation, useQueryClient } from "@tanstack/react-query"
import { acceptFriendship } from "../../api/friendshipApi"
import { useParams } from "react-router"

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
        }
    })

    return (
        <button
            onClick={() => acceptMutation.mutate(idFriendship)}
            disabled={acceptMutation.isPending} // Deshabilitamos el botón mientras la petición está en curso.
            className="flex gap-2 w-fit px-4 py-2 bg-[#1877f2] text-white rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
        >{"Confirmar"}</button>
    )
}
