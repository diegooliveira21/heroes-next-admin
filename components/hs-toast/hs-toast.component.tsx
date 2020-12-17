import React, {
  useState,
  useEffect,
  ReactElement, useRef,
} from 'react';
import { Toast } from 'react-bootstrap';
import { HSToastListProp, HSToastProps } from '@components/hs-toast/hs-toast.types';
import { makeTimeNow } from '@libraries/date.library';
import { ToastListStyled } from './toast.styles';

export default function HSToast({
  title,
  message,
}: HSToastProps): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const timeNow = useRef<string>(makeTimeNow()).current;

  const handleIsVisibleTrue = () => setIsVisible(true);
  const handleIsVisibleFalse = () => setIsVisible(false);

  useEffect(
    () => {
      handleIsVisibleTrue();
    },
    [],
  );

  return (
    <Toast show={isVisible} onClose={handleIsVisibleFalse}>
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded mr-2"
          alt=""
        />
        <strong className="mr-auto">{title}</strong>
        <small>{timeNow}</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export function HSToastList({
  toastList,
}: HSToastListProp): ReactElement {
  return (
    <ToastListStyled>
      {toastList.map(({
        message,
        title,
      }) => (
        <HSToast
          title={title}
          message={message}
        />
      ))}
    </ToastListStyled>
  );
}
