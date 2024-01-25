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
  padding: '0 0 20px 0',

  // height: '420px',
  // width: '650px',
  // margin: '50px auto',
  // rounded: '7px',
  // boxShadow: '0px 14px 32px 0px rgba(0, 0, 0, 0.15)',
  // border: '2px solid #f2f2f2',
  width: '250px',
  rounded: '24px',
  overflow: 'hidden',
  border: '1px solid grey',
});

const productImage = css({
  flexBasis: '138px',
  flexGrow: 0,
  overflow: 'hidden',
  // float: 'left',
  // height: '420px',
  // width: '327px',
});

const productInfo = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '0px 7px 7px 0px',
  backgroundColor: 'white',
});

const productPriceBtn = css({
  height: '103px',
  width: '327px',
  marginTop: '17px',
  position: 'relative',
});

const productText = css({
  height: '300px',
  width: '327px',
});

const titleStyle = css({
  fontSize: '12px',
  fontWeight: '600',
  padding: '5px 10px',
});

const descriptionStyle = css({
  fontSize: '11px',
  fontWeight: '400',
  padding: '5px 10px',
  lineHeight: '1.3',
  color: 'dark-light',
  flexGrow: 1,
});

const button = css({
  // float: 'right',
  // display: 'inline-block',
  alignSelf: 'flex-end',
  padding: '6px 12px',
  // boxSizing: 'border-box',
  border: 'transparent',
  borderRadius: '60px',
  fontSize: '10px',
  fontWeight: '500',
  textTransform: 'uppercase',
  // letterSpacing: '1.5px',
  color: 'dark-light',
  backgroundColor: 'primary-100',
  // cursor: 'pointer',
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
        <img src={image} />
      </div>
      <div className={productInfo}>
        <h1 className={titleStyle}>{title}</h1>
        <p className={descriptionStyle}>{description}</p>
        {/* <button
          type="button"
          className={button}>
          View product
        </button> */}
      </div>
    </article>
  );
}
