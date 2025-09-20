import { IconButton, type SvgIconProps } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

interface ButtonNavbarProps {
    Icon: React.ComponentType<SvgIconProps>;
    to: string;
}

export default function ButtonNavbar({ Icon, to }: ButtonNavbarProps) {
    return (
        <IconButton component={Link} to={to}>
            <Icon sx={{ height: "36px", width: "36px", color: 'action.active', '&:hover': { color: 'primary.main' } }} />
        </IconButton>
    )
}
