import React, {
  useRef,
  useCallback,
  ReactElement,
  BaseSyntheticEvent,
} from 'react';
import { useAuth } from '@providers/auth/auth.provider';
import {
  Button,
  Spinner,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';

export default function HSPasswordResetSend(): ReactElement {
  const {
    isAuthLoading,
    sendPasswordResetEmail,
  } = useAuth();

  const inputEmailRef = useRef({ value: '' });

  const handleInputEmailRef = (event: BaseSyntheticEvent) => {
    inputEmailRef.current.value = event.target.value;
  };

  const makeSendPasswordResetEmail = useCallback(
    () => sendPasswordResetEmail(inputEmailRef.current.value),
    [inputEmailRef],
  );

  return (
    <>
      <FormGroup controlId="formBasicEmail">
        <FormLabel>E-mail</FormLabel>
        <FormControl
          type="email"
          placeholder="Digite seu e-mail"
          onChange={handleInputEmailRef}
        />
      </FormGroup>
      <Button
        variant="primary"
        onClick={makeSendPasswordResetEmail}
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
