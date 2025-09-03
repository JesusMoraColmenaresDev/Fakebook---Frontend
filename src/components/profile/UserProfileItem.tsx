import { Link } from "react-router";
import { generateColorFromText } from "../../utils/colorsUtil";

type UserProfileItemProps = {
  id: number | string;
  name: string;
  profilePictureUrl: string;
}

export default function UserProfileItem({ id, name, profilePictureUrl }: UserProfileItemProps) {
  const colorProfileImage = generateColorFromText(name)
  console.log(colorProfileImage)
  return (
    <Link
      to={`/profile/${id}`}
      className="flex w-fit items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
    >
      {/*foto de perfil temporal*/}
      <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center text-white`} style={{ backgroundColor: colorProfileImage }}>
        {name.split(" ")[0][0].toUpperCase()}
      </div>
      {/*<img
        src={profilePictureUrl}
        alt={`Foto de perfil de ${name}`}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />*/}
      <span className="font-semibold text-gray-800">{name}</span>
    </Link>
  );
}
