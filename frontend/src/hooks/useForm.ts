import { ChangeEvent, FormEvent, useState } from 'react';

type ValidationState = Record<string, boolean>;

type FormDataType = string | number | boolean | Date | null;

type FormData = {
  [key: string]: FormDataType;
};

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

interface FormConfig<T extends FormData> {
  initialFormData: T;
  validator: Record<string, (input: FormDataType, formData?: T) => boolean>;
  initialFormValidationState?: ValidationState;
}

function generateValidationKey(key: string): string {
  return `valid${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

function generateDefaultValidationState(formDataKeys: string[]): ValidationState {
  return formDataKeys.reduce(
    (validationState, key) => ({
      ...validationState,
      [generateValidationKey(key)]: true,
    }),
    {} as ValidationState
  );
}

function generateValidationMapping(formDataKeys: string[]): Record<string, string> {
  const validationStateKeys = Object.keys(generateDefaultValidationState(formDataKeys));
  return formDataKeys.reduce(
    (mapping, key, index) => ({
      ...mapping,
      [key]: validationStateKeys[index],
    }),
    {} as Record<string, string>
  );
}

function useForm<T extends FormData>({
  initialFormData,
  initialFormValidationState: initialFormValidationStateProp,
  validator,
}: FormConfig<T>) {
  let initialFormValidationState = initialFormValidationStateProp;

  if (!initialFormValidationState) {
    initialFormValidationState = generateDefaultValidationState(Object.keys(initialFormData));
  }

  const validationMapping = generateValidationMapping(Object.keys(initialFormData));

  const [formData, setFormData] = useState<T>(initialFormData);
  const [formValidation, setFormValidation] = useState<ValidationState>(initialFormValidationState);

  const processInputEvent = (event: InputChangeEvent): FormData[keyof FormData] => {
    const { target } = event;
    const { type } = target as HTMLInputElement;

    let value: FormData[keyof FormData] = null;

    if (target instanceof HTMLInputElement) {
      switch (type) {
        case 'checkbox':
          value = target.checked;
          break;
        case 'number':
          value = target.valueAsNumber;
          break;
        case 'date':
          value = target.valueAsDate;
          break;
        default:
          value = target.value;
      }
    } else {
      value = target.value;
    }

    return value;
  };

  const handleInputFieldChange = (event: InputChangeEvent) => {
    const { name } = event.target as HTMLInputElement;
    const value = processInputEvent(event);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = (event: InputChangeEvent) => {
    const { name } = event.target as HTMLInputElement;
    const value = processInputEvent(event);

    const isValid = validator[name](value, formData);
    setFormValidation((prev) => ({ ...prev, [validationMapping[name]]: isValid }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    callback: (data: typeof formData) => Promise<unknown>
  ) => {
    event.preventDefault();

    let newFormValidation = formValidation;

    Object.keys(formData).forEach((field) => {
      const isValid = validator[field](formData[field], formData);
      newFormValidation = { ...newFormValidation, [validationMapping[field]]: isValid };
    });

    setFormValidation(newFormValidation);

    const allFieldsValid = Object.values(newFormValidation).every(Boolean);

    console.log(allFieldsValid);
    console.log(formData);

    if (allFieldsValid) {
      const response = await callback(formData);
      return response; // returns response from the pages submit (unneeded currently)
    }

    return null;
  };

  return {
    formData,
    formValidation,
    handleInputFieldChange,
    handleBlur,
    handleSubmit,
  };
}

export default useForm;
