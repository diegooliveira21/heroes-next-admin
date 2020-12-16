import { transparentize } from 'polished';

const color = {
  primary: '#2196f3',
  secondary: '#FFF',
  danger: '#e53935',
};

const borderRadius = {
  small: '3px',
  medium: '6px',
  large: '12px',
  circular: '100%',
};

const boxShadows = {
  base: `0 1px 5px ${transparentize(0.4, color.primary)}`,
  uniform: `0 0px 8px ${transparentize(0.6, color.primary)}`,
};

const lightTheme = {
  color,
  boxShadows,
  borderRadius,
};

export default lightTheme;
