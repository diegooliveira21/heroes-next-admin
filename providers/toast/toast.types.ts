import { ReactElement } from 'react';
import { HSToastProps } from '@components/hs-toast/hs-toast.types';

export interface ToastProviderProps {
  children: ReactElement;
}

export interface ToastProviderType {
  toastList: HSToastProps[];
}

export interface ToastProviderContext {
  addToast: (toast: HSToastProps) => void;
}
