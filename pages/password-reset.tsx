import React, {
  ReactElement,
} from 'react';
import {
  Button,
  Container,
} from 'react-bootstrap';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';
import HSPasswordResetForm from '@components/hs-password-reset-form/hs-password-reset-form.component';

export default function PasswordResetPage(): ReactElement {
  const {
    pushToHome,
  } = useHSRouters();

  return (
    <Container>
      <h4>Recupere sua senha</h4>
      <HSPasswordResetForm />
      <Button
        variant="dark"
        onClick={pushToHome}
        block
      >
        Acessar sua conta
      </Button>
    </Container>
  );
}
