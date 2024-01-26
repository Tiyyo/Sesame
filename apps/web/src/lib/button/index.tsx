import { ComponentPropsWithoutRef } from 'react';
import { css } from '../../../styled-system/css';
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  textContent?: string;
}
/* style */
const button = css({
  fontSize: 'sm',
  fontWeight: '500',
  color: 'white',
  bg: 'primary-100',
  border: 'none',
  rounded: '8px',
  padding: '0.625rem 1.25rem',
  cursor: 'pointer',
  _hover: {
    bg: 'primary-200',
    opacity: '0.8',
  },
});
/* style */

export default function Button({ textContent, ...props }: ButtonProps) {
  return (
    <button
      type={props.type}
      value={props.value}
      className={button}>
      {textContent}
    </button>
  );
}
