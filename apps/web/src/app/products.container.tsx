'use client';

import ProductCard from '@/lib/product-card';
import { css } from '../../styled-system/css/css';
import { Product } from './page';

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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '5px',
        padding: '15px',
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
