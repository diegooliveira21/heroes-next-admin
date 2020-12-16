import React, {
  useRef,
  useCallback,
  ReactElement,
} from 'react';
import { useAuth } from '@providers/auth/auth.provider';
import {
  Button,
  Spinner,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { HSPasswordResetFormTypes } from '@components/hs-password-reset-form/hs-password-reset-form.types';
import { HSPasswordResetFormInputNameEnum } from '@components/hs-password-reset-form/hs-password-reset-form.enums';
import useHSPasswordResetFormValidation
  from '@components/hs-password-reset-form/hs-password-reset-form-validation.hook';
import HSInputErrorMessage from '@components/hs-input-error-message/hs-input-error-message.component';

export default function HSPasswordResetForm(): ReactElement {
  const {
    isAuthLoading,
    sendPasswordResetEmail,
  } = useAuth();
  const {
    errorMessage,
    makeValidations,
  } = useHSPasswordResetFormValidation();

  const formDataRef = useRef<
    HSPasswordResetFormTypes['formData']
    >({ email: '' });

  const handleFormDataRef: HSPasswordResetFormTypes['handleFormDataRef'] = (
    inputName,
  ) => (event) => {
    formDataRef.current[inputName] = event.target.value;
  };

  const handleFormSubmit = useCallback<
    HSPasswordResetFormTypes['handleFormSubmit']
    >(
      async () => {
        const {
          email,
        } = formDataRef.current;

        if (!(await makeValidations(formDataRef.current))) return;

        sendPasswordResetEmail(email);
      },
      [formDataRef],
    );

  return (
    <>
      <FormGroup controlId="formBasicEmail">
        <FormLabel>E-mail</FormLabel>
        <FormControl
          type="email"
          placeholder="Digite seu e-mail"
          onChange={handleFormDataRef(HSPasswordResetFormInputNameEnum.Email)}
        />
      </FormGroup>
      <HSInputErrorMessage message={errorMessage} />
      <Button
        variant="primary"
        onClick={handleFormSubmit}
        block
      >
        {isAuthLoading ? (
          <Spinner animation="border" />
        ) : (
          'Receber código de reset'
        )}
      </Button>
    </>
  );
}
