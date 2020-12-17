import * as yup from 'yup';
import { HSSignInFormTypes, UseHSSignInFormValidation } from '@components/hs-sign-in-form/hs-sign-in-form.types';
import { useMemo, useState } from 'react';
import { HSSignInFormInputErrorEnum } from '@components/hs-sign-in-form/hs-sign-in-form.enums';
import { UseHSPasswordResetFormValidation } from '@components/hs-password-reset-form/hs-password-reset-form.types';

export default function
useHSPasswordResetFormValidation(): UseHSPasswordResetFormValidation {
  const [errorMessage, setErrorMessage] = useState<
    UseHSSignInFormValidation['errorMessage']
    >('');

  const schema = yup.object().shape({
    email: yup.string()
      .email(HSSignInFormInputErrorEnum.EmailInvalid)
      .required(HSSignInFormInputErrorEnum.InputRequired)
    ,
  });

  const resetValidations:
    UseHSPasswordResetFormValidation['resetValidations'] = () => (
      setErrorMessage('')
    );

  const makeValidations:
    UseHSPasswordResetFormValidation['makeValidations'] = async (
      formData: HSSignInFormTypes['formData'],
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
