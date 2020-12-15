import { ReactElement } from 'react';

export interface HSStepperControls {
  isStepActive: (index: number) => boolean;
  isStepLast: (index: number) => boolean;
  handleNext: VoidFunction;
  handleBack: VoidFunction;
  handlePrev: (index: number) => void;
  handleReset: VoidFunction;
  scrollToTop: VoidFunction;
}

export interface HSStepperMap {
  label: string;
  icon?: ReactElement;
  hasHandlePrev?: true;
  component: (controls: HSStepperControls) => ReactElement
}

export interface HSStepperProps {
  stepperMap: HSStepperMap[];
}

export interface StepperStyledStepLabelProps {
  hasIcon: boolean;
  isStepActive: boolean;
}

export interface StepperStyledStepIconProps {
  isStepActive: boolean;
}
