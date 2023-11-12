import { ChangeEvent } from 'react';

export interface AuthInputFieldProps {
  type?: string;
  id?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  invalid?: boolean;
  errorMessage?: string;
}

function AuthInputField({
  type = 'text',
  id,
  placeholder = '',
  name,
  value,
  onChange,
  onBlur = () => {},
  label = '',
  invalid = false,
  errorMessage = '',
}: AuthInputFieldProps) {
  const inputClassName = `w-full p-2 border rounded${invalid ? ' border-red-600' : ''}`;
  const labelClassName = 'block mb-2 text-sm font-medium text-gray-600';

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}:
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={invalid ? 'true' : 'false'}
          className={inputClassName}
        />
        {invalid && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default AuthInputField;
