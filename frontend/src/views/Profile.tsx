import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Profile() {
  const { authState } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Profile Page</h1>
      <div>
        <h2 className="font-bold text-2xl mb-2">User Details</h2>
        <p>Logged In: {String(authState.isLoggedIn)}</p>
        <p>Username: {authState.user?.username || 'null'}</p>
        <p>Email: {authState.user?.email || 'null'}</p>
      </div>
    </div>
  );
}

export default Profile;
