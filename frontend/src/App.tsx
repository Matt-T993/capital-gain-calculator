import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import About from './views/About';
import Dashboard from './views/Dashboard';
import ErrorPage from './views/ErrorPage';
import FAQ from './views/FAQ';
import Home from './views/Home';
import Login from './views/Login';
import PrivacyPolicy from './views/PrivacyPolicy';
import Profile from './views/Profile';
import Register from './views/Register';
import SecurityPolicy from './views/SecurityPolicy';
import TermsAndConditions from './views/TermsAndConditions';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins, sans-serif'].join(','),
  },
});

export default function App() {
  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/error',
      element: <ErrorPage />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/privacyPolicy',
      element: <PrivacyPolicy />,
    },
    {
      path: '/termsAndConditions',
      element: <TermsAndConditions />,
    },
    {
      path: '/securityPolicy',
      element: <SecurityPolicy />,
    },
    {
      path: '/faq',
      element: <FAQ />,
    },
  ];

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ThemeProvider>
    </AuthProvider>
  );
}
