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
      <button className={css({})}>Logout</button>
    </form>
  );
}
