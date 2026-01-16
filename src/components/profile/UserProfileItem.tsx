import React from "react";
import { Link } from "react-router";
import type { UserItemType } from "../../types";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../utils/colorsUtil";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { MoreVerticalIcon } from "lucide-react";

export default function UserProfileItem({ id, name, last_name }: UserItemType) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Link to={`/profile/${id}`} className="flex justify-between gap-2 w-full items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <Avatar {...stringAvatar(name + " " + last_name)}></Avatar>
        <span className="font-semibold text-4xl  text-gray-800">{name + " " + last_name}</span>
      </div>
    </Link>
  );
}
