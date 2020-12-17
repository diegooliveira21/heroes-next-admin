import { BaseSyntheticEvent } from 'react';

interface FormData {
  email: string;
  password: string;
}

export interface HSSignInFormTypes {
  formData: FormData;
  handleFormDataRef: (
    inputName: keyof HSSignInFormTypes['formData']
  ) => (event: BaseSyntheticEvent) => void;
  handleIsRegister: VoidFunction;
  handleFormSubmit: () => Promise<void>;
  isRegister: boolean;
}

export interface UseHSSignInFormValidation {
  errorMessage: string;
  makeValidations: (
    formData: HSSignInFormTypes['formData']
  ) => Promise<boolean>;
  resetValidations: () => void;
}
