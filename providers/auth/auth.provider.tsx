import React, {
  useState,
  useEffect,
  useContext,
  ReactElement,
  createContext,
} from 'react';
import nookies from 'nookies';
import { firebaseClient } from '../../firebaseClient';
import { AuthContextType, AuthProviderProps } from './auth.types';

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

  const createUserWithEmailAndPassword: AuthContextType[
    'createUserWithEmailAndPassword'
    ] = async (
      email,
      password,
    ) => {
      setIsAuthLoading(true);
      return firebaseClient.auth()
        .createUserWithEmailAndPassword(email, password)
        .finally(() => setIsAuthLoading(false));
    };

  const signInWithEmailAndPassword: AuthContextType[
    'signInWithEmailAndPassword'
    ] = async (
      email,
      password,
    ) => {
      setIsAuthLoading(true);
      return firebaseClient.auth()
        .signInWithEmailAndPassword(email, password)
        .finally(() => setIsAuthLoading(false));
    };

  const sendPasswordResetEmail: AuthContextType[
    'sendPasswordResetEmail'
    ] = async (
      email,
    ) => {
      setIsAuthLoading(true);
      return firebaseClient.auth()
        .sendPasswordResetEmail(email)
        .finally(() => setIsAuthLoading(false));
    };

  const verifyPasswordResetCode: AuthContextType[
    'verifyPasswordResetCode'
    ] = async (
      code,
    ) => {
      setIsAuthLoading(true);
      return firebaseClient.auth()
        .verifyPasswordResetCode(code)
        .finally(() => setIsAuthLoading(false));
    };

  const confirmPasswordReset: AuthContextType[
    'confirmPasswordReset'
    ] = async (
      code,
      newPassword,
    ) => {
      setIsAuthLoading(true);
      return firebaseClient.auth()
        .confirmPasswordReset(code, newPassword)
        .finally(() => setIsAuthLoading(false));
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
