import { ReactElement } from 'react';
import { firebaseClient } from '../../firebaseClient';

export interface AuthContextType {
  user: firebaseClient.User | null;
  isAuthLoading: boolean;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => (Promise<firebaseClient.auth.UserCredential> | null);
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => (Promise<firebaseClient.auth.UserCredential> | null);
  sendPasswordResetEmail: (
    email: string,
  ) => (Promise<void> | null);
  verifyPasswordResetCode: (
    code: string,
  ) => (Promise<string> | null);
  confirmPasswordReset: (
    email: string,
    newPassword: string
  ) => (Promise<void> | null);
}

export interface AuthProviderProps {
  children: ReactElement;
}
