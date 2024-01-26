import { css } from '../../../styled-system/css';

/* style */
const container = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  py: '0.5rem',
});

const line = css({
  display: 'flex',
  border: '1px solid',
  borderColor: 'grey-light',
  opacity: '10',
  flexBasis: '40%',
});

const words = css({
  font: 'light',
  fontSize: 'xs',
  fontWeight: '400',
  color: 'grey',
});

/* style */

function SeparatorLine({ separatorWords }: { separatorWords?: string }) {
  return (
    <div className={container}>
      <div className={line}></div>
      <p className={words}>{separatorWords}</p>
      <div className={line}></div>
    </div>
  );
}

export default SeparatorLine;
