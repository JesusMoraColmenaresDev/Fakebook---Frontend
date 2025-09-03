import { Pencil } from "lucide-react";
import { generateColorFromText } from "../../utils/colorsUtil";

export default function EditProfileButton() {
    
    return (
        <button className="flex gap-2 w-fit px-4 py-2 bg-[#1877f2] text-white rounded-2xl ">
            <Pencil />
            Editar perfil
        </button>
    )
}
