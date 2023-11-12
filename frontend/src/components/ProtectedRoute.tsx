import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { authState } = useAuth();

  if (authState.isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default ProtectedRoute;
