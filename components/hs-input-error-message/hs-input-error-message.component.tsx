import React, { ReactElement } from 'react';
import { InputErrorMessageStyled } from './hs-input-error-message.styles';

export interface HSInputErrorMessageProps {
  message: string | null;
}

export default function HSInputErrorMessage({
  message,
}: HSInputErrorMessageProps): ReactElement {
  return (
    <InputErrorMessageStyled>{message}</InputErrorMessageStyled>
  );
}
