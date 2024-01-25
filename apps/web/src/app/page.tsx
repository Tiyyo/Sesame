import { css } from '../../styled-system/css';
import ProductsContainer from './products.container';

export type Product = {
  article: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
};

export default async function Home() {
  const results = await fetch('http://localhost:8000/api/products', {
    method: 'GET',
    cache: 'no-cache',
  });
  const fetchProducts = await results.json();
  const products: Product[] = fetchProducts.data;

  return (
    <section
      className={css({
        fontSize: '2xl',
        fontWeight: 'bold',
        backgroundColor: 'base-light',
        minHeight: '100vh',
      })}>
      <header
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 15px',
          height: '60px',
        })}>
        <p>Hello 🐼!</p> <button className={css({})}>Logout</button>
      </header>
      <main>
        <ProductsContainer products={products} />
      </main>
    </section>
  );
}
