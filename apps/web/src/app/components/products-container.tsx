'use client';

import ProductCard from '@/app/components/product-card';
import { css } from '../../../styled-system/css/css';
import { Product } from '../page';

type ProductsContainerProps = {
  products: Product[];
};

export default function ProductsContainer({
  products,
}: ProductsContainerProps) {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        padding: '50px 25px',
        gap: '15px 30px',
      })}>
      {products &&
        products.map((product) => (
          <ProductCard
            key={product.article.id}
            title={product.article.title}
            image={product.article.image}
            description={product.article.description}
          />
        ))}
    </div>
  );
}
