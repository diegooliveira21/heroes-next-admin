import React, {
  useRef,
  useState,
  useCallback,
  ReactElement,
} from 'react';
import {
  Form,
  Button,
  Container,
} from 'react-bootstrap';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';
import { useAuth } from '@providers/auth/auth.provider';

function HSSignInForm(): ReactElement {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const {
    createUserWithEmailAndPassword,
  } = useAuth();
  const {
    pushToPasswordReset,
  } = useHSRouters();

  const inputDefaultValue = { value: '' };
  const refInputEmail = useRef(inputDefaultValue);
  const refInputPassword = useRef(inputDefaultValue);

  const handleFormSubmit = useCallback(() => {
    const { value: email } = refInputEmail?.current;
    const { value: password } = refInputPassword?.current;
    const formData = { email, password };

    // TODO: Will be implemented in future commit
    // if (!email || !password) return openSnackbar(HSSignInFormEnum.BlankFields);

    return createUserWithEmailAndPassword(email, password);
  }, [
    isRegister,
    refInputEmail,
    refInputPassword,
  ]);

  const handleIsRegister = () => setIsRegister(prevState => !prevState);

  return (
    <>
      <h4>
        {isRegister ? 'Faça seu cadastro' : 'Acesse sua conta'}
      </h4>
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu e-mail"
              // ref={refInputEmail}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              // ref={refInputPassword}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleFormSubmit}
          >
            {isRegister ? 'Registrar' : 'Acessar'}
          </Button>
          <Button
            variant="dark"
            onClick={handleIsRegister}
          >
            {
              isRegister
                ? 'Já é cadastrado? Acesse sua conta'
                : 'Ainda não tem conta? Faça seu cadastro'
            }
          </Button>
          <Button
            variant="light"
            onClick={pushToPasswordReset}
          >
            Esqueceu sua senha? Clique aqui
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default HSSignInForm;
