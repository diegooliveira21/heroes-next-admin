import * as yup from 'yup';
import { HSSignInFormTypes, UseHSSignInFormValidation } from '@components/hs-sign-in-form/hs-sign-in-form.types';
import { useMemo, useState } from 'react';
import { HSSignInFormInputErrorEnum } from '@components/hs-sign-in-form/hs-sign-in-form.enums';

export default function useHSSignInFormValidation(): UseHSSignInFormValidation {
  const [errorMessage, setErrorMessage] = useState<
    UseHSSignInFormValidation['errorMessage']
    >('');

  const schema = yup.object().shape({
    email: yup.string()
      .email(HSSignInFormInputErrorEnum.EmailInvalid)
      .required(HSSignInFormInputErrorEnum.InputRequired),
    password: yup.string()
      .required(HSSignInFormInputErrorEnum.InputRequired)
      .min(5, HSSignInFormInputErrorEnum.PasswordMin)
    ,
  });

  const resetValidations: UseHSSignInFormValidation['resetValidations'] = () => (
    setErrorMessage('')
  );

  const makeValidations: UseHSSignInFormValidation['makeValidations'] = async (
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
