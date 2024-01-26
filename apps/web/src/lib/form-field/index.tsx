'use client';
import { ComponentPropsWithRef, useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';

interface FormFieldProps extends ComponentPropsWithRef<'input'> {
  Icon?: JSX.Element;
  SubIcon?: JSX.Element;
  register?: any;
  label?: string;
  error?: unknown;
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
  marginTop: '0.5rem',
});

const input = css({
  fontSize: 'xs',
  border: 'none',
  width: '100%',
  padding: '0.725rem 0.625rem',
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

export default function FormField({
  register,
  error,
  name,
  ...props
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={container}>
      <label className={label}>{props.label}</label>
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
          {...(register ? { ...register(name) } : undefined)}
        />
      </div>
      <p
        className={css({
          color: 'red',
          fontSize: '12px',
          fontWeight: 'light',
          marginTop: '0.35rem',
        })}>
        {typeof error === 'string' && error}
      </p>
    </div>
  );
}
