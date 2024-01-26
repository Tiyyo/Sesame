'use client';
import Button from '@/lib/button';
import { css } from '../../../../styled-system/css';
import LayoutAuth from '@/app/(auth)/components/layout-auth';
import FormField from '@/lib/form-field';
import { AtSignIcon, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchemaType } from '@sesame/schema';
import SeparatorLine from '@/lib/separator-line';
import ErrorNotification from '@/lib/error-notification';
import { useState } from 'react';

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
  marginLeft: '1rem',
});

/*style */

export default function Page() {
  const router = useRouter();
  const [triggerCountNotif, setTriggerCountNotif] = useState(0);
  const [errorServer, setErrorServer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });
  const handleClickSignIn = () => {
    router.push('/login');
  };

  const onSubmit = async (data: RegisterSchemaType) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.message === 'success') router.push('/login');
    if (result.error) {
      setErrorServer(result.error);
      setTriggerCountNotif(triggerCountNotif + 1);
    }
  };

  return (
    <LayoutAuth>
      <form
        className={form}
        onSubmit={handleSubmit(onSubmit)}>
        <p className={headText}>Sign up for</p>
        <ErrorNotification
          message={errorServer}
          interval={3500}
          triggerRender={triggerCountNotif}
        />
        <FormField
          type="text"
          name="email"
          label="Email"
          placeholder="Enter your email"
          Icon={
            <AtSignIcon
              size={16}
              className={icons}
            />
          }
          error={errors.email?.message}
          register={register}
        />
        <FormField
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          Icon={
            <Eye
              size={18}
              className={icons}
            />
          }
          error={errors.password?.message}
          register={register}
        />
        <FormField
          type="password"
          name="confirmedPassword"
          label="Confirm your password"
          placeholder="Confirm your password"
          Icon={
            <Eye
              size={18}
              className={icons}
            />
          }
          error={errors.confirmedPassword?.message}
          register={register}
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
