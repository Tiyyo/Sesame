import { css } from '../../../styled-system/css/css';

type ProductCardProps = {
  title: string;
  image: string;
  description: string;
};

/* style */
const product = css({
  display: 'flex',
  flexDirection: 'column',
  width: '250px',
  rounded: '24px',
  overflow: 'hidden',
  border: '1px solid grey',
});

const productImage = css({
  flexBasis: '138px',
  flexGrow: 0,
  overflow: 'hidden',
});

const productInfo = css({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  backgroundColor: 'white',
  paddingBottom: '20px',
});

const titleStyle = css({
  fontSize: '12px',
  fontWeight: '600',
  padding: '5px 10px',
});

const descriptionStyle = css({
  fontSize: '12px',
  fontWeight: '400',
  padding: '5px 10px',
  lineHeight: '1.25',
  color: 'dark-light',
  lineClamp: 8.2,
  textOverflow: 'ellipsis',
});

/* style */

export default function ProductCard({
  title,
  image,
  description,
}: ProductCardProps) {
  return (
    <article className={product}>
      <div className={productImage}>
        <img
          src={image}
          alt={title}
        />
      </div>
      <div className={productInfo}>
        <h1 className={titleStyle}>{title}</h1>
        <p className={descriptionStyle}>{description}</p>
      </div>
    </article>
  );
}
