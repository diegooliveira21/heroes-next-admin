import React, {
  useRef,
  useState,
  useCallback,
  ReactElement,
} from 'react';
import {
  Form,
  Button,
  Spinner,
  Container,
} from 'react-bootstrap';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';
import { useAuth } from '@providers/auth/auth.provider';
import { HSSignInFormTypes } from '@components/hs-sign-in-form/hs-sign-in-form.types';
import { HSSignInFormInputNameEnum } from '@components/hs-sign-in-form/hs-sign-in-form.enums';
import useHSSignInFormValidation from '@components/hs-sign-in-form/hs-sign-in-form-validations.hook';
import HSInputErrorMessage from '@components/hs-input-error-message/hs-input-error-message.component';

function HSSignInForm(): ReactElement {
  const [isRegister, setIsRegister] = useState<
    HSSignInFormTypes['isRegister']
    >(false);

  const {
    isAuthLoading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } = useAuth();
  const {
    pushToDashboard,
    pushToPasswordReset,
  } = useHSRouters();
  const {
    errorMessage,
    makeValidations,
    resetValidations,
  } = useHSSignInFormValidation();

  const formDataRef = useRef<HSSignInFormTypes['formData']>({
    email: '',
    password: '',
  });

  const handleFormDataRef: HSSignInFormTypes['handleFormDataRef'] = (
    inputName,
  ) => (event) => {
    formDataRef.current[inputName] = event.target.value;
  };

  const handleFormSubmit = useCallback<
    HSSignInFormTypes['handleFormSubmit']
    >(async () => {
      const {
        email,
        password,
      } = formDataRef.current;

      if (!(await makeValidations(formDataRef.current))) return;

      const isAuthenticated = await (isRegister
        ? createUserWithEmailAndPassword(email, password)
        : signInWithEmailAndPassword(email, password));

      if (isAuthenticated) pushToDashboard();
    }, [
      isRegister,
      formDataRef,
      makeValidations,
    ]);

  const handleIsRegister: HSSignInFormTypes['handleIsRegister'] = () => {
    resetValidations();
    setIsRegister(prevState => !prevState);
  };

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
              onChange={handleFormDataRef(HSSignInFormInputNameEnum.Email)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              onChange={handleFormDataRef(HSSignInFormInputNameEnum.Password)}
            />
          </Form.Group>
          <HSInputErrorMessage message={errorMessage} />
          <Button
            variant="primary"
            onClick={handleFormSubmit}
          >
            {(!isAuthLoading
            && (isRegister ? 'Registrar' : 'Acessar'))
            || <Spinner animation="border" />}
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
