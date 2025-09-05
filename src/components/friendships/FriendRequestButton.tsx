import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequestFriendship } from "../../api/friendshipApi";
import { useParams } from "react-router";

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
        <button
            className="flex gap-2 w-fit px-4 py-2 bg-[#1877f2] text-white rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={() => sendRequestMutation.mutate(idProfile)}
            disabled={sendRequestMutation.isPending}
        >{textButton}</button>
    )
}
