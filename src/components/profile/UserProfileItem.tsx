import { Link } from "react-router";
import { generateColorFromText } from "../../utils/colorsUtil";
import type { userDataForItemsType } from "../../types";


export default function UserProfileItem({ id, name, last_name }: userDataForItemsType) {
  const colorProfileImage = generateColorFromText(name)
  console.log(colorProfileImage)
  return (
    <Link
      to={`/profile/${id}`}
      className="flex w-full items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
    >
      {/*foto de perfil temporal*/}
      <div className={`w-16 h-16 rounded-full mr-3 flex items-center justify-center text-white`} style={{ backgroundColor: colorProfileImage }}>
        {name.split(" ")[0][0].toUpperCase()}
      </div>
      {/*<img
        src={profilePictureUrl}
        alt={`Foto de perfil de ${name}`}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />*/}
      <span className="font-semibold text-2xl  text-gray-800">{name + " " + last_name}</span>
    </Link>
  );
}
