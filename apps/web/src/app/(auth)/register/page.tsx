'use client';

import Button from '@/lib/button';
import { css } from '../../../../styled-system/css';
import LayoutAuth from '@/layout/auth';
import FormField from '@/lib/form-field';
import SeparatorLine from '@/lib/separator-line';
import { AtSignIcon, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

/*style */

const headText = css({
  font: 'medium',
  fontSize: 'sm',
  textAlign: 'center',
});

const form = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
  bg: 'white',
  width: '80vw',
  maxWidth: '450px',
  rounded: '24px',
  shadow:
    'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;',
  p: '2rem 1rem',
});

const icons = css({
  color: 'primary-500',
  opacity: '0.5',
});

/*style */

export default function Page() {
  const router = useRouter();
  const handleClickSignIn = () => {
    router.push('/login');
  };
  return (
    <LayoutAuth>
      <form className={form}>
        <p className={headText}>Sign up for</p>
        <FormField
          type="text"
          name="Email"
          placeholder="Enter your email"
          Icon={
            <AtSignIcon
              size={16}
              className={icons}
            />
          }
        />
        <FormField
          type="password"
          name="Password"
          placeholder="Enter your password"
          Icon={
            <Eye
              size={18}
              className={icons}
            />
          }
        />
        <FormField
          type="password"
          name="Confirm your Password"
          placeholder="Confirm your password"
          Icon={
            <Eye
              size={18}
              className={icons}
            />
          }
        />
        <Button textContent="Sign up" />
        <a
          className={css({
            fontWeight: 400,
            fontSize: '12px',
            textAlign: 'center',
            padding: '0 1rem',
          })}>
          Already have an account ?
          <span
            onClick={handleClickSignIn}
            className={css({
              fontWeight: 700,
              fontSize: '12px',
              margin: '0 0.25rem',
              color: 'primary-400',
              cursor: 'pointer',
            })}>
            Log In
          </span>
        </a>
        <SeparatorLine separatorWords="OR" />
      </form>
    </LayoutAuth>
  );
}
