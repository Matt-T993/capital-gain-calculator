type ValidatorFunction = (...args: any[]) => boolean;
type Validator = Record<string, ValidatorFunction>;

const validateEmail: ValidatorFunction = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

const validateUsername: ValidatorFunction = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
};

const validatePasswordStrength: ValidatorFunction = (password: string): boolean => {
  return (
    password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
  );
};

const validateEmailOrUsername: ValidatorFunction = (input: string): boolean => {
  return validateEmail(input) || validateUsername(input);
};

const validatePasswordNotEmpty: ValidatorFunction = (input: string): boolean => {
  return input !== '';
};

const validateConfirmPassword: ValidatorFunction = (input: string, password: string): boolean => {
  return input === password;
};

export const loginFieldValidators: Validator = {
  emailOrUsername: validateEmailOrUsername,
  password: validatePasswordNotEmpty,
  rememberMe: (value: boolean) => true,
};

export const registerFieldValidators: Validator = {
  email: validateEmail,
  username: validateUsername,
  password: validatePasswordStrength,
  confirmPassword: (input, formData) => {
    return formData?.password ? validateConfirmPassword(input, formData.password) : false;
  },
  acceptDisclaimer: (input: boolean) => {
    return input === true;
  },
};

export const addEventValidator: Validator = {
  assetType: (s) => s === 'CRYPTO' || s === 'STOCK',
  pricePerUnit: (s) => true,
  assetId: (s) => true,
  eventType: (s) => s === 'BUY' || s === 'SELL',
  quantity: (s) => true,
  eventDate: (s) => true,
};
