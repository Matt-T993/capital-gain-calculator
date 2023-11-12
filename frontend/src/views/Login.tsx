import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthButton from '../components/AuthButton';
import AuthInputField from '../components/AuthInputField';
import AuthLayout from '../components/AuthLayout';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';
import { loginUser } from '../utils/apiService';
import { loginFieldValidators } from '../utils/validationHelper';

function Login() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();

  const { formData, formValidation, handleInputFieldChange, handleBlur, handleSubmit } = useForm({
    initialFormData: {
      emailOrUsername: '',
      password: '',
      rememberMe: false,
    },
    validator: loginFieldValidators,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await loginUser(formData);

      if (response.error) {
        setLoginError(response.message);
      }
      console.log(response);
      if (response && !response.error) {
        setAuthState({
          isLoggedIn: true,
          user: {
            username: response?.username || null,
            email: response?.email || null,
          },
        });
        console.log(authState);
        navigate('/dashboard');
      }
    } catch (error) {
      setLoginError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <section>
        <h2 className="mb-6 text-3xl font-bold text-center md:text-left">Sign In</h2>
        <p className="mb-4 text-center md:text-left">
          If you don&apos;t have an account you can{' '}
          <Link to="/register" className="text-indigo-700 hover:underline">
            register here
          </Link>
        </p>
        {loginError === '' || (
          <p className="mb-4 font-bold text-center text-red-700 md:text-left">{loginError}</p>
        )}
        <form
          className="flex flex-col space-y-2"
          onSubmit={(e) => handleSubmit(e, handleLoginSubmit)}
        >
          <AuthInputField
            type="text"
            id="emailOrUsername"
            placeholder="Enter your email or username"
            label="Email or Username"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleInputFieldChange}
            onBlur={handleBlur}
            invalid={!formValidation.validEmailOrUsername}
            errorMessage="Invalid Email or Username"
          />
          <AuthInputField
            type="password"
            id="password"
            placeholder="Enter your password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputFieldChange}
            onBlur={handleBlur}
            invalid={!formValidation.validPassword}
            errorMessage="Password is required"
          />
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center" htmlFor="rememberMe">
              <input
                type="checkbox"
                className="mr-2"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputFieldChange}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-indigo-700 hover:underline">
              Forgot password
            </Link>
          </div>
          <AuthButton
            type="submit"
            isSubmitting={isSubmitting}
            submittingText="Logging in"
            defaultText="Login"
          />
        </form>
      </section>
      <div className="flex-1 hidden m-2 bg-indigo-900 rounded-lg md:flex md:m-4 lg:m-8 bg-auto bg-no-repeat bg-center bg-[url('/login.png')]" />
    </AuthLayout>
  );
}

export default Login;
