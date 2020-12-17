import { ReactElement } from 'react';
import { firebaseClient } from '../../firebaseClient';

export interface AuthContextType {
  user: firebaseClient.User | null;
  isAuthLoading: boolean;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => (Promise<boolean> | null);
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => (Promise<boolean> | null);
  sendPasswordResetEmail: (
    email: string,
  ) => (Promise<boolean> | null);
  verifyPasswordResetCode: (
    code: string,
  ) => (Promise<void> | null);
  confirmPasswordReset: (
    newPassword: string
  ) => (Promise<void> | null);
}

export interface AuthProviderProps {
  children: ReactElement;
}

export interface PasswordResetData {
  code: string;
  email: string;
}
