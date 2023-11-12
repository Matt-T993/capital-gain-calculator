import { logoutUser } from '../utils/apiService';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
    } catch (error) {
      // Do nothing!
    } finally {
      setAuthState({
          isLoggedIn: false,
          user: {
            username: null,
            email: null,
          },
        });
        navigate('/');
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outlined"
      style={{
        borderRadius: '2rem',
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '0.7rem 2rem',
      }}
    >Logout</Button>
  )
};

export default LogoutButton;
