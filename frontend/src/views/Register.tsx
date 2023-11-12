import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthButton from '../components/AuthButton';
import AuthInputField from '../components/AuthInputField';
import AuthLayout from '../components/AuthLayout';
import DisclaimerModal from '../components/DisclaimerModal';
import PasswordInputField from '../components/PasswordInputField';
import useForm from '../hooks/useForm';
import { registerUser } from '../utils/apiService';
import { registerFieldValidators } from '../utils/validationHelper';

function Register() {
  const navigate = useNavigate();

  const { formData, formValidation, handleInputFieldChange, handleBlur, handleSubmit } = useForm({
    initialFormData: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      acceptDisclaimer: false,
    },
    validator: registerFieldValidators,
  });

  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const handleRegisterSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const { email, username, password } = formData;
    const response = await registerUser({ email, username, password });

    if (!response.error) {
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } else {
      setRegistrationError(`${response.message} : ${response.error}`);
    }

    setIsSubmitting(false);
  };

  const handleDisclaimerClick = () => {
    setIsDisclaimerModalOpen(true);
  };

  const handleDisclaimerModalClose = () => {
    setIsDisclaimerModalOpen(false);
  };

  return (
    <AuthLayout>
      <section>
        <h2 className="mb-6 text-3xl font-bold text-center md:text-left">Sign Up</h2>
        <p className="mb-4 text-center md:text-left">
          Already signed up?{' '}
          <Link to="/login" className="text-indigo-700 hover:underline">
            Login to existing account
          </Link>
        </p>
        {registrationError === '' || (
          <p className="mb-4 font-bold text-center text-red-700 md:text-left">
            {registrationError}
          </p>
        )}
        <form
          className="flex flex-col space-y-2"
          onSubmit={(e) => handleSubmit(e, handleRegisterSubmit)}
        >
          <AuthInputField
            type="email"
            id="email"
            placeholder="user@domain"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputFieldChange}
            onBlur={handleBlur}
            invalid={!formValidation.validEmail}
            errorMessage="Must be a valid email"
          />
          <AuthInputField
            type="text"
            id="username"
            placeholder="Username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputFieldChange}
            onBlur={handleBlur}
            invalid={!formValidation.validUsername}
            errorMessage="Username must be letters or digits only"
          />
          <PasswordInputField
            id="password"
            placeholder="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputFieldChange}
            onBlur={handleBlur}
            invalid={!formValidation.validPassword}
            errorMessage="Password must be at least 8 characters, contain an uppercase, lowercase, number"
          />
          <AuthInputField
            type="password"
            id="password-confirmation"
            placeholder="confirm password"
            label="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputFieldChange}
            onBlur={handleBlur}
            invalid={!formValidation.validConfirmPassword}
            errorMessage="Password doesn't match"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="accept-disclaimer"
              name="acceptDisclaimer"
              checked={formData.acceptDisclaimer}
              onChange={handleInputFieldChange}
              className="mr-2"
            />
            <label
              className={`text-indigo-700 cursor-pointer ${
                isDisclaimerModalOpen ? 'opacity-50 pointer-events-none' : ''
              }`}
              onClick={isDisclaimerModalOpen ? null : handleDisclaimerClick}
            >
              Accept Disclaimer
            </label>
          </div>

          {!formValidation.validAcceptDisclaimer && (
            <p className="text-red-700">You must accept the disclaimer to register.</p>
          )}
          <AuthButton
            type="submit"
            isSubmitting={isSubmitting}
            submittingText="Registering"
            defaultText="Register"
          />
        </form>
      </section>
      {isDisclaimerModalOpen && <DisclaimerModal onClose={handleDisclaimerModalClose} />}
      <div className="flex-1 hidden m-2 bg-indigo-900 rounded-lg md:flex md:m-4 lg:m-8 bg-auto bg-no-repeat bg-center bg-[url('/login.png')]" />
    </AuthLayout>
  );
}

export default Register;
