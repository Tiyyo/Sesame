'use client';
import { ComponentPropsWithRef, useState } from 'react';
import { css } from '../../../styled-system/css';

interface FormFieldProps extends ComponentPropsWithRef<'input'> {
  Icon?: JSX.Element;
  SubIcon?: JSX.Element;
}

/* style */
const container = css({
  width: '100%',
});

const label = css({
  fontWeight: '400',
  fontSize: 'sm',
});

const wrapperInput = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  border: '1px solid',
  borderColor: 'grey-light',
  borderRadius: '0.375rem',
  padding: '0.725rem 0.625rem',
  marginTop: '0.5rem',
});

const input = css({
  fontSize: 'xs',
  border: 'none',
  width: '100%',
  _placeholder: {
    fontSize: '14px',
    opacity: '0.7',
  },
  _focus: {
    outline: 'none',
    ring: '0',
  },
});
/* style */

export default function FormField({ ...props }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={container}>
      <label className={label}>{props.name}</label>
      <div className={wrapperInput}>
        <div onClick={() => setShowPassword(!showPassword)}>{props.Icon}</div>
        <input
          type={
            props.type === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : props.type
          }
          className={input}
          placeholder={props.placeholder}
          autoComplete={props.type === 'password' ? 'off' : 'on'}
        />
      </div>
    </div>
  );
}
