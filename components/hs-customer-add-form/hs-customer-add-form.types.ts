import { BaseSyntheticEvent } from 'react';
import { CustomerContextTypes } from '@providers/customer/customer.types';

interface InputListItem {
  name: keyof CustomerContextTypes['customerData'];
  label: string;
}

export interface HSCustomerAddFormTypes {
  formData: CustomerContextTypes['customerData'];
  handleFormDataRef: (
    inputName: keyof HSCustomerAddFormTypes['formData']
  ) => (event: BaseSyntheticEvent) => void;
  handleFormSubmit: () => Promise<void>;
  inputList: InputListItem[];
  handleFormDataRefReset: () => void;
}

export interface UseCustomerAddFormValidations {
  errorMessage: string;
  resetValidations: () => void;
  makeValidations: (
    formData: HSCustomerAddFormTypes['formData']
  ) => Promise<boolean>;
}
