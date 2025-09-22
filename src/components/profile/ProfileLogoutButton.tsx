import { useNavigate } from 'react-router';
import { handleLogout } from '../../utils/authenticationUtils';
import { Button } from '@mui/material';

export default function ProfileLogoutButton() {
  const navigate = useNavigate();
  const onLogout = () => handleLogout(navigate);
  return (
    <Button
      onClick={onLogout}
      color="error"
      variant="contained"
    >
      Cerrar sesión
    </Button>
  );
}
