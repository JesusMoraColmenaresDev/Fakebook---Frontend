import Button from "@mui/material/Button";
import { Pencil } from "lucide-react";

export default function EditProfileButton() {
    
    return (
        <Button variant="contained" startIcon={<Pencil />}>
            Editar perfil
        </Button>
    )
}
