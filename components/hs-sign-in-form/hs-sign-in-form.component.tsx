import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  ReactElement,
} from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import useStyles from '@components/hs-sign-in-form/hs-sign-in-form.styles';
import { GlobalContext } from '@contexts/global.context';
import { HSSignInFormEnum } from '@components/hs-sign-in-form/hs-sign-in-form.enums';

function HSSignInForm(): ReactElement {
  const classes = useStyles();

  const [isRegister, setIsRegister] = useState<boolean>(false);

  const {
    user: {
      userRegister,
      userAuthenticate,
    },
    snackbar: {
      openSnackbar,
    },
  } = useContext(GlobalContext);

  const inputDefaultValue = { value: '' };
  const refInputEmail = useRef(inputDefaultValue);
  const refInputPassword = useRef(inputDefaultValue);

  const handleFormSubmit = useCallback(() => {
    const { value: email } = refInputEmail?.current;
    const { value: password } = refInputPassword?.current;
    const formData = { email, password };

    if (!email || !password) return openSnackbar(HSSignInFormEnum.BlankFields);

    return isRegister ? userRegister(formData) : userAuthenticate(formData);
  }, [
    isRegister,
    refInputEmail,
    refInputPassword,
  ]);

  const handleIsRegister = () => setIsRegister(prevState => !prevState);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        {isRegister ? 'Faça seu cadastro' : 'Acesse sua conta'}
      </Typography>
      <Grid container className={classes.inputWrapper}>
        <TextField
          inputRef={refInputEmail}
          label="E-mail"
          type="email"
          variant="filled"
          fullWidth
        />
        <TextField
          inputRef={refInputPassword}
          label="Senha"
          type="password"
          variant="filled"
          fullWidth
        />
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={handleFormSubmit}
          fullWidth
        >
          {isRegister ? 'Registrar' : 'Acessar'}
        </Button>
        <Button
          color="primary"
          size="large"
          variant="text"
          onClick={handleIsRegister}
          fullWidth
        >
          {
            isRegister
              ? 'Já é cadastrado? Acesse sua conta'
              : 'Ainda não tem conta? Faça seu cadastro'
          }
        </Button>
      </Grid>
    </>
  );
}

export default HSSignInForm;
