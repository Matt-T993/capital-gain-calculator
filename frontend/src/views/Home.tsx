import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';
import { fetchUserData } from '../utils/apiService';

function Home() {
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState.isLoggedIn) {
      fetchUserData()
        .then((response) => {
          if (response && !response.error) {
            setAuthState({
              isLoggedIn: true,
              user: {
                username: response?.username || null,
                email: response?.email || null,
              },
            });
            if (window.location.pathname === '/') {
              navigate('/dashboard');
            }
          }
        })
        .catch((error) => {
          console.log('unable to fetch userdata');
        });
    }
  }, [authState, setAuthState, navigate]);

  return (
    <div className="relative bg-cover h-screen w-screen pt-60 sm:pt-64 px-4 bg-[url('/landingpage.png')]">
      <header className="fixed top-0 inset-x-0 z-50 flex flex-col sm:flex-row items-center sm:items-start text-white p-4 lg:px-8">
        <h1 className="flex-1 mb-6 sm:mb-0 text-3xl font-bold text-center sm:text-left">
          Capital Gains Calculator
        </h1>
        <nav className="flex items-center space-x-2 justify-center sm:justify-start mb-4 sm:mb-0">
          <Link
            to="/login"
            className="font-semibold rounded-lg transition-colors duration-300 hover:underline"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="font-semibold p-1.5 px-4 sm:px-8 bg-purple-500 rounded-lg transition-colors duration-300 hover:bg-purple-600"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <div className="text-white text-left lg:w-1/2">
        <p className="font-normal text-xl sm:text-2xl">
          Easily keep track of your gains and losses
        </p>
        <p className="my-5 font-medium text-4xl sm:text-5xl lg:text-6xl">
          The best cryptocurrency and stock tracker has arrived!
        </p>
        <p className="font-normal text-xl sm:text-2xl">
          Calculate your tax on your capital gains and losses
        </p>
      </div>
      <div className="absolute bottom-2 w-11/12">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
