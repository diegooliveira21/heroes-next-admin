import * as yup from 'yup';
import { useMemo, useState } from 'react';
import {
  HSCustomerAddFormTypes,
  UseCustomerAddFormValidations,
} from '@components/hs-customer-add-form/hs-customer-add-form.types';
import { HSCustomerAddFormInputErrorEnum } from '@components/hs-customer-add-form/hs-customer-add-form.enums';

export default function
useHSCustomerAddFormValidations(): UseCustomerAddFormValidations {
  const [errorMessage, setErrorMessage] = useState<
    UseCustomerAddFormValidations['errorMessage']
    >('');

  const schema = yup.object().shape({
    name: yup.string()
      .required(HSCustomerAddFormInputErrorEnum.InputRequired),
    age: yup.string()
      .required(HSCustomerAddFormInputErrorEnum.InputRequired),
    maritalStatus: yup.string()
      .required(HSCustomerAddFormInputErrorEnum.InputRequired),
    document: yup.number()
      .required(HSCustomerAddFormInputErrorEnum.InputRequired),
    city: yup.string()
      .required(HSCustomerAddFormInputErrorEnum.InputRequired),
    state: yup.string()
      .required(HSCustomerAddFormInputErrorEnum.InputRequired),
  });

  const resetValidations: UseCustomerAddFormValidations['resetValidations'] = () => (
    setErrorMessage('')
  );

  const makeValidations: UseCustomerAddFormValidations['makeValidations'] = async (
    formData: HSCustomerAddFormTypes['formData'],
  ) => schema
    .validate(formData)
    .then(() => {
      resetValidations();
      return true;
    })
    .catch(({ errors }) => {
      setErrorMessage(errors[0]);
      return false;
    });

  return useMemo(
    () => ({
      errorMessage,
      makeValidations,
      resetValidations,
    }),
    [
      errorMessage,
      makeValidations,
      resetValidations,
    ],
  );
}
