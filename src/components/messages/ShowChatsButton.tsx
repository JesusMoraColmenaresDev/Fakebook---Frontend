import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router';

export default function ShowChatsButton() {
    return (
        <Link to="/conversations">
            <ChatIcon sx={{ height: "48px", width: "48px", color: 'action.active', '&:hover': { color: 'primary.main' } }} />
        </Link>
    )
}
