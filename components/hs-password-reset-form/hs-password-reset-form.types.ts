import { BaseSyntheticEvent } from 'react';

interface FormData {
  email: string;
}

export interface HSPasswordResetFormTypes {
  formData: FormData;
  handleFormDataRef: (
    inputName: keyof HSPasswordResetFormTypes['formData']
  ) => (event: BaseSyntheticEvent) => void;
  handleFormSubmit: () => Promise<void>;
}

export interface UseHSPasswordResetFormValidation {
  errorMessage: string;
  makeValidations: (
    formData: HSPasswordResetFormTypes['formData']
  ) => Promise<boolean>;
  resetValidations: () => void;
}
