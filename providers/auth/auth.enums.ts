// TODO: Will be used in future commits
export enum AuthProviderSnackbarEnum {
  LoginUserFailed = 'Ops, algo deu errado. Tente novamente',
  LoginUserSuccess = 'Conta acessada com sucesso!',
  RegisterUserFailed = 'Ops, algo deu errado. Tente novamente',
  RegisterUserSuccess = 'Usuário criado com sucesso!',
}
// TODO: Will be used in future commits
export enum AuthProviderCommonEnum {
  Token = 'USER_TOKEN',
}

export enum AuthProviderToastMessageEnum {
  OnSendPasswordReset = 'Um link de recuperação de senha foi enviado ao seu e-mail',
  OnCreateUser = 'Sua conta foi criada com sucesso',
  OnSign = 'Você acessou sua conta',
  OnEmptyInput = 'Todos os campos são necessários',
  OnFetchingCreateUser = 'Solicitando criação de conta',
  OnFetchingSignIn = 'Solicitando acesso à conta',
  OnFetchingReset = 'Solicitando código de reset',
}
