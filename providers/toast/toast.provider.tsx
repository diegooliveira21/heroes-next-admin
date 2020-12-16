import React, {
  useState,
  useEffect,
  useContext,
  ReactElement,
  createContext,
} from 'react';
import { HSToastList } from '@components/hs-toast/hs-toast.component';
import { HSToastProps } from '@components/hs-toast/hs-toast.types';
import {
  ToastProviderType,
  ToastProviderProps,
  ToastProviderContext,
} from './toast.types';

const ToastContext = createContext<ToastProviderContext>({
  addToast: () => null,
});

export function useToast(): ToastProviderContext {
  return useContext(ToastContext);
}

export default function ToastProvider({
  children,
}: ToastProviderProps): ReactElement {
  const [toastList, setToastList] = useState<ToastProviderType['toastList']>([]);

  const addToast = (toastData: HSToastProps) => setToastList(prevState => ([
    ...prevState,
    toastData,
  ]));

  const deflateToastList = () => {
    const [, ...restToast] = toastList;
    setToastList(restToast);
  };

  useEffect(
    () => {
      if (toastList.length > 0) {
        const tickDeflateToastList = setInterval(
          () => deflateToastList(),
          3000,
        );
        return () => clearInterval(tickDeflateToastList);
      }
    },
    [toastList],
  );

  return (
    <ToastContext.Provider value={{
      addToast,
    }}
    >
      {children}
      <HSToastList toastList={toastList} />
    </ToastContext.Provider>
  );
}
