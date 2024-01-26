import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css/css';

type ErrorNotificationProps = {
  message?: string;
  interval?: number;
  triggerRender: number;
};
/* style */
const icon = css({
  position: 'absolute',
  top: '0.25rem',
  right: '0.25rem',
  color: 'red',
  cursor: 'pointer',
  height: '1.5rem',
  width: '1.5rem',
  rounded: 'sm',
  _hover: {
    backgroundColor: 'grey-light',
  },
});

const text = css({
  fontSize: 'xs',
  textAlign: 'center',
});

function ErrorNotification({
  message,
  interval = 3500,
  triggerRender,
}: ErrorNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setCurrentMessage(message);
    if (message !== currentMessage) {
      setIsOpen(true);

      const timer = setTimeout(() => {
        setIsOpen(false);
        setCurrentMessage('');
      }, interval);

      return () => clearTimeout(timer);
    }
  }, [message, triggerRender]);

  return (
    <div
      className={css({
        display: !isOpen ? 'none' : 'flex',
        height: !isOpen ? '0' : 'auto',
        position: 'relative',
        padding: '1rem 2rem',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'error-light',
        border: '1px solid',
        borderColor: 'error',
        width: '100%',
        rounded: '6px',
        color: 'error-dark',
      })}
      data-active={true}>
      <X
        size={10}
        className={icon}
        onClick={() => setIsOpen(false)}
      />
      <p className={text}>{message}</p>
    </div>
  );
}

export default ErrorNotification;
