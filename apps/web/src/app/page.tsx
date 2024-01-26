import { css } from '../../styled-system/css';
import LogoutBn from './(auth)/components/logout-btn';
import ProductsContainer from './components/products-container';
import { cookies } from 'next/headers';

export type Product = {
  article: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
};

export async function getProdutcs() {
  const cookieStore = cookies();
  const token = cookieStore.get('_token');
  if (!token) throw new Error('User is not logged in');

  const results = await fetch(`${process.env.API_BASE_URL}/api/products`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!results.ok) throw new Error('Error fetching products');
  const fetchProducts = await results.json();
  const products: Product[] = fetchProducts.data;
  return products;
}

export default async function Home() {
  const products = await getProdutcs();

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
        <p className={css({ color: 'primary-500' })}>Hello 🐼!</p> <LogoutBn />
      </header>
      <main>
        <ProductsContainer products={products} />
      </main>
    </section>
  );
}
