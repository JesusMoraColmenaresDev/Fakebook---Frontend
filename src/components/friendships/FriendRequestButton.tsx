import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequestFriendship } from "../../api/friendshipApi";
import { useParams } from "react-router";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

type FriendRequestButtonProps = {
    idProfile: string,
    textButton: string
}

export default function FriendRequestButton({ idProfile, textButton }: FriendRequestButtonProps) {
    const queryClient = useQueryClient();
    const { userId } = useParams<{ userId: string }>();

    console.log("userId from params:", userId, "idProfile:", idProfile);

    const sendRequestMutation = useMutation({
        mutationFn: sendRequestFriendship,
        onSuccess: () => {
            console.log("Solicitud enviada, invalidando query ['friendship',", userId, "]");
            // Invalida la query para que la UI se actualice y muestre el estado "pendiente".
            queryClient.invalidateQueries({ queryKey: ['friendship', userId] });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Error al enviar la solicitud de amistad.");
        }
    });

    return (
        <Button variant="contained"
            onClick={() => sendRequestMutation.mutate(idProfile)}
            disabled={sendRequestMutation.isPending}
        >{textButton}</Button>
    )
}
