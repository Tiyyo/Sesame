'use client';
import { useParams, useRouter } from 'next/navigation';
import { css } from '../../../../styled-system/css/css';

export default function LogoutBn() {
  const router = useRouter();
  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      if (response.status === 200) {
        router.push('/login');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <form onClick={handleLogout}>
      <button
        className={css({
          bg: 'primary-100',
          p: '0.5rem 1rem',
          rounded: '24px',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer',
        })}>
        Logout
      </button>
    </form>
  );
}
