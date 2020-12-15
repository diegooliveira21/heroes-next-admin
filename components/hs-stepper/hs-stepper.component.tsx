import React, { ReactElement, useState } from 'react';
import { HSStepperControls, HSStepperProps } from '@components/hs-stepper/hs-stepper.types';
import {
  StepperStyled,
  StepperStyledStep,
  StepperStyledWrapper,
  StepperStyledStepIcon,
  StepperStyledStepLabel,
} from './hs-stepper.styles';

export default function HSStepper({
  stepperMap,
}: HSStepperProps): ReactElement {
  const [activeStep, setActiveStep] = useState<number>(0);

  const isStepActive: HSStepperControls['isStepActive'] = (
    index,
  ) => (
    activeStep >= index
  );

  const isStepLast: HSStepperControls['isStepLast'] = () => (
    stepperMap.length - 1
  ) === activeStep;

  const scrollToTop: HSStepperControls['scrollToTop'] = () => window.scroll(0, 0);

  const handleNext: HSStepperControls['handleNext'] = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    scrollToTop();
  };

  const handleBack: HSStepperControls['handleBack'] = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop();
  };

  const handlePrev: HSStepperControls['handlePrev'] = (index: number) => {
    const { hasHandlePrev = true } = stepperMap[activeStep];

    if (isStepActive(index) && hasHandlePrev) {
      setActiveStep(
        (prevActiveStep) => prevActiveStep - (prevActiveStep - index),
      );
      scrollToTop();
    }
    return null;
  };

  const handleReset: HSStepperControls['handleReset'] = () => {
    setActiveStep(0);
  };

  const stepperControls = {
    isStepActive,
    isStepLast,
    handleNext,
    handleBack,
    handlePrev,
    handleReset,
    scrollToTop,
  };

  return (
    <StepperStyled>
      <StepperStyledWrapper>
        {stepperMap.map(({
          icon,
          label,
        },
        index) => (
          <StepperStyledStep key={label}>
            <StepperStyledStepLabel
              isStepActive={isStepActive(index)}
              onClick={() => handlePrev(index)}
              hasIcon={!!icon}
            >
              {icon && (
              <StepperStyledStepIcon isStepActive={isStepActive(index)}>
                {icon}
              </StepperStyledStepIcon>
              )}
              {label}
            </StepperStyledStepLabel>
          </StepperStyledStep>
        ))}
      </StepperStyledWrapper>
      {stepperMap[activeStep].component(stepperControls)}
    </StepperStyled>
  );
}
