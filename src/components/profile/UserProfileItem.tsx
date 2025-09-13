import { Link } from "react-router";
import type { UserItemType } from "../../types";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../utils/colorsUtil";


export default function UserProfileItem({ id, name, last_name }: UserItemType) {
  return (
    <Link
      to={`/profile/${id}`}
      className="flex gap-2 w-full items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
    >
      {/*foto de perfil temporal*/}
      <Avatar {...stringAvatar(name + " " + last_name)}></Avatar>
      {/*<img
        src={profilePictureUrl}
        alt={`Foto de perfil de ${name}`}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />*/}
      <span className="font-semibold text-2xl  text-gray-800">{name + " " + last_name}</span>
    </Link>
  );
}
