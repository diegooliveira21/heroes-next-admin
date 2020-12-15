import styled from 'styled-components';
import { StepperStyledStepIconProps, StepperStyledStepLabelProps } from '@components/hs-stepper/hs-stepper.types';

export const StepperStyled = styled.div`
    width: 100%;
`;

export const StepperStyledWrapper = styled.div`
  ${({ theme }) => `
    padding: 0;
    height: 43px;
    display: flex;
    overflow: hidden;
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.boxShadows.base};
    background-color: ${theme.color.secondary};
  `}
`;

export const StepperStyledStep = styled.div`
  flex: 2 1 auto;
  padding: 0;
`;

export const StepperStyledStepLabel = styled.div<StepperStyledStepLabelProps>`
  ${({ theme, hasIcon, isStepActive }) => `
    position: relative;
    display: flex;
    padding: ${hasIcon ? '8px' : '6px'} 0;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: ${theme.color.primary};

    ${isStepActive && `
      background-color: ${theme.color.primary};
      cursor: pointer;
      color: ${theme.color.secondary};
    `}

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      margin-left: -0.5em;
      right: -34px;
      bottom: -37px;
      box-sizing: border-box;
      border: 1.1em solid #000;
      border-color: ${theme.color.primary};
      border-radius: ${theme.borderRadius.medium};

      transform-origin: 0 0;
      transform: rotate(-135deg);
      }
    }
  `}
`;

export const StepperStyledStepIcon = styled.div<StepperStyledStepIconProps>`
  ${({ theme, isStepActive }) => `
    width: auto;
    height: 27px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    z-index: 190;

    & svg, & svg * {
      fill: ${theme.color.primary}
    }

    ${isStepActive && `
      & svg, & svg * {
        fill: ${theme.color.secondary}
      }
    `}
  `}
`;
