'use client';
import { useRouter } from 'next/navigation';
import { css } from '../../../../styled-system/css/css';

export default function NavAuth() {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push('/login');
  };

  const handleClickSignUp = () => {
    router.push('/register');
  };
  return (
    <nav
      className={css({
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        fontSize: '14px',
        gap: '1rem',
        padding: '1rem 2rem',
      })}>
      <button
        className={css({ cursor: 'pointer' })}
        onClick={handleClickLogin}>
        Log In
      </button>
      <button
        className={css({
          bg: 'primary-100',
          p: '0.5rem 1rem',
          rounded: '24px',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer',
        })}
        onClick={handleClickSignUp}>
        Sign Up
      </button>
    </nav>
  );
}
