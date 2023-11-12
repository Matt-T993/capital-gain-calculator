import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import AuthInputField, { AuthInputFieldProps } from './AuthInputField';

interface PasswordInputFieldProps extends AuthInputFieldProps {
  label: string;
}

const checkPasswordStrength = (password: string) => {
  const result = zxcvbn(password);
  return result.score;
};

const getPasswordStrengthDescriptor = (score: number) => {
  switch (score) {
    case 0:
      return { strength: 'Weak', color: 'text-red-600' };
    case 1:
      return { strength: 'Fair', color: 'text-orange-500' };
    case 2:
      return { strength: 'Good', color: 'text-yellow-500' };
    case 3:
      return { strength: 'Strong', color: 'text-green-500' };
    case 4:
      return { strength: 'Very Strong', color: 'text-green-700' };
    default:
      return { strength: 'Unknown', color: 'text-gray-500' };
  }
};

function PasswordInputField({
  id,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  label,
  invalid,
  errorMessage,
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const strengthDescriptor = getPasswordStrengthDescriptor(checkPasswordStrength(value as string));
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-600">
          {label}:
        </label>
        <span className={`text-sm ${strengthDescriptor.color}`}>{strengthDescriptor.strength}</span>
      </div>
      <div className="relative">
        <AuthInputField
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          invalid={invalid}
          errorMessage={errorMessage}
          type={showPassword ? 'text' : 'password'}
        />
        <button
          type="button"
          className="absolute top-1/2 transform -translate-y-1/2 right-0 pr-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInputField;
