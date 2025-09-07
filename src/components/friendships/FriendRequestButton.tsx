import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequestFriendship } from "../../api/friendshipApi";
import { useParams } from "react-router";
import Button from "@mui/material/Button";

type FriendRequestButtonProps = {
    idProfile: string,
    textButton: string
}

export default function FriendRequestButton({ idProfile, textButton }: FriendRequestButtonProps) {
    const queryClient = useQueryClient();
    const { userId } = useParams<{ userId: string }>();

    const sendRequestMutation = useMutation({
        mutationFn: sendRequestFriendship,
        onSuccess: () => {
            console.log("Solicitud enviada, invalidando query ['friendship',", userId, "]");
            // Invalida la query para que la UI se actualice y muestre el estado "pendiente".
            queryClient.invalidateQueries({ queryKey: ['friendship', userId] });
        }
    });

    return (
        <Button variant="contained"
            onClick={() => sendRequestMutation.mutate(idProfile)}
            disabled={sendRequestMutation.isPending}
        >{textButton}</Button>
    )
}
