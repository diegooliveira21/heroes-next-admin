import React, {
  ReactElement,
} from 'react';
import {
  Button,
  Container,
} from 'react-bootstrap';
import HSPasswordResetSend from '@components/hs-password-reset-send/hs-password-reset-send.component';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';

export default function PasswordResetPage(): ReactElement {
  const {
    pushToHome,
  } = useHSRouters();

  return (
    <Container>
      <h4>Recupere sua senha</h4>
      <HSPasswordResetSend />
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
