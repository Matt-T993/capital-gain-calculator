import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from 'react';
import { onUnauthorized } from '../utils/axiosService';

interface User {
  username?: string | null;
  email?: string | null;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | string | null;
}

interface AuthContextProps {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: {
    isLoggedIn: false,
    user: null,
  },
  setAuthState: () => {},
});

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  const value = useMemo(() => ({ authState, setAuthState }), [authState, setAuthState]);

  useEffect(() => {
    const unregister = onUnauthorized(() => {
      setAuthState({
        isLoggedIn: false,
        user: null,
      });
    });
    return unregister;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
