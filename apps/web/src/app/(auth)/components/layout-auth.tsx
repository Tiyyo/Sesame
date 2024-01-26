import NavAuth from '@/app/(auth)/components/nav-auth';
import { css } from '../../../../styled-system/css';

/* style */
const main = css({
  minHeight: '100vh',
  width: '100%',
  color: 'dark',
  bg: 'base-light',
  display: 'flex',
  flexDir: 'column',
});

const section = css({
  display: 'flex',
  flexDir: 'column',
  flexGrow: '1',
  xl: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: '1200px',
    flexDir: 'row',
  },
});

const childrenContainer = css({
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: '1',
});

/* style */

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={main}>
      <header>
        <NavAuth />
      </header>
      <section className={section}>
        <div className={childrenContainer}>{children}</div>
      </section>
    </main>
  );
}
