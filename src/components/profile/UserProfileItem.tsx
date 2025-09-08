import { Link } from "react-router";
import { generateColorFromText } from "../../utils/colorsUtil";
import type { userDataForItemsType } from "../../types";
import Avatar from "@mui/material/Avatar";


export default function UserProfileItem({ id, name, last_name }: userDataForItemsType) {
  const colorProfileImage = generateColorFromText(name)
  console.log(colorProfileImage)
  return (
    <Link
      to={`/profile/${id}`}
      className="flex w-full items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
    >
      {/*foto de perfil temporal*/}
      <Avatar sx = {{height : 48, width :48, marginRight : 1}}>{name[0].toUpperCase() + last_name[0].toUpperCase()}</Avatar>
      {/*<img
        src={profilePictureUrl}
        alt={`Foto de perfil de ${name}`}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />*/}
      <span className="font-semibold text-2xl  text-gray-800">{name + " " + last_name}</span>
    </Link>
  );
}
