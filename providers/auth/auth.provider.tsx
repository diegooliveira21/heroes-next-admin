import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  ReactElement,
  createContext,
} from 'react';
import nookies from 'nookies';
import { ToastCommonTitleEnum } from '@providers/toast/toast.enums';
import { AuthProviderToastMessageEnum } from '@providers/auth/auth.enums';
import useHSRouters from '@hooks/use-hs-routers/use-hs-routers';
import { firebaseClient } from '../../firebaseClient';
import { AuthContextType, AuthProviderProps, PasswordResetData } from './auth.types';
import { useToast } from '../toast/toast.provider';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthLoading: false,
  confirmPasswordReset: () => null,
  sendPasswordResetEmail: () => null,
  verifyPasswordResetCode: () => null,
  signInWithEmailAndPassword: () => null,
  createUserWithEmailAndPassword: () => null,
});

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const passwordResetDataInitial = {
    code: '',
    email: '',
  };
  const passwordResetDataRef = useRef<PasswordResetData>(
    passwordResetDataInitial,
  );

  const {
    addToast,
  } = useToast();
  const {
    pushToHome,
  } = useHSRouters();

  const createUserWithEmailAndPassword: AuthContextType[
    'createUserWithEmailAndPassword'
    ] = async (
      email,
      password,
    ) => {
      try {
        setIsAuthLoading(true);
        if (!email || !password) {
          throw new Error(AuthProviderToastMessageEnum.OnEmptyInput);
        }

        addToast({
          title: ToastCommonTitleEnum.Wait,
          message: AuthProviderToastMessageEnum.OnFetchingCreateUser,
        });

        await firebaseClient.auth()
          .createUserWithEmailAndPassword(email, password);

        addToast({
          title: ToastCommonTitleEnum.Wait,
          message: AuthProviderToastMessageEnum.OnCreateUser,
        });

        return true;
      } catch (error) {
        addToast({
          title: ToastCommonTitleEnum.Error,
          message: error.message,
        });

        return false;
      } finally {
        setIsAuthLoading(false);
      }
    };

  const signInWithEmailAndPassword: AuthContextType[
    'signInWithEmailAndPassword'
    ] = async (
      email,
      password,
    ) => {
      try {
        setIsAuthLoading(true);
        if (!email || !password) {
          throw new Error(AuthProviderToastMessageEnum.OnEmptyInput);
        }

        addToast({
          title: ToastCommonTitleEnum.Wait,
          message: AuthProviderToastMessageEnum.OnFetchingSignIn,
        });

        await firebaseClient.auth()
          .signInWithEmailAndPassword(email, password);

        addToast({
          title: ToastCommonTitleEnum.Success,
          message: AuthProviderToastMessageEnum.OnSign,
        });

        return true;
      } catch (error) {
        addToast({
          title: ToastCommonTitleEnum.Error,
          message: error.message,
        });

        return false;
      } finally {
        setIsAuthLoading(false);
      }
    };

  const sendPasswordResetEmail: AuthContextType[
    'sendPasswordResetEmail'
    ] = async (
      email,
    ) => {
      try {
        setIsAuthLoading(true);
        if (!email) {
          throw new Error(AuthProviderToastMessageEnum.OnEmptyInput);
        }

        addToast({
          title: ToastCommonTitleEnum.Wait,
          message: AuthProviderToastMessageEnum.OnFetchingReset,
        });

        await firebaseClient.auth()
          .sendPasswordResetEmail(email);

        addToast({
          title: ToastCommonTitleEnum.Success,
          message: AuthProviderToastMessageEnum.OnSendPasswordReset,
        });

        return true;
      } catch (error) {
        addToast({
          title: ToastCommonTitleEnum.Error,
          message: error.message,
        });

        return false;
      } finally {
        setIsAuthLoading(false);
      }
    };

  const verifyPasswordResetCode: AuthContextType[
    'verifyPasswordResetCode'
    ] = async (
      code,
    ) => {
      try {
        setIsAuthLoading(true);

        passwordResetDataRef.current = {
          code,
          email: await firebaseClient.auth()
            .verifyPasswordResetCode(code)
            .then(((email) => email)),
        };
      } finally {
        setIsAuthLoading(false);
      }
    };

  const confirmPasswordReset: AuthContextType[
    'confirmPasswordReset'
    ] = async (
      newPassword,
    ) => {
      setIsAuthLoading(true);
      return firebaseClient.auth()
        .confirmPasswordReset(passwordResetDataRef.current.code, newPassword)
        .finally(() => {
          passwordResetDataRef.current = passwordResetDataInitial;
          setIsAuthLoading(false);
        });
    };

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(
    () => firebaseClient.auth()
      .onIdTokenChanged(async (firebaseUser) => {
        if (!firebaseUser) {
          setUser(null);
          nookies.set(undefined, 'token', '', null);
        } else {
          const token = await firebaseUser.getIdToken();
          setUser(firebaseUser);
          nookies.set(undefined, 'token', token, null);
        }
      }),
    [],
  );

  // force refresh the token every 10 minutes
  useEffect(
    () => {
      const handle = setInterval(async () => {
        const { currentUser } = firebaseClient.auth();
        if (currentUser) await currentUser.getIdToken(true);
      }, 10 * 60 * 1000);

      // clean up setInterval
      return () => clearInterval(handle);
    },
    [],
  );

  useEffect(
    () => {
      if (!user) pushToHome();
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        confirmPasswordReset,
        sendPasswordResetEmail,
        verifyPasswordResetCode,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
