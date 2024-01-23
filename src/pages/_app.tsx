import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import type { AppProps } from 'next/app';
import { Button, createTheme, MantineProvider } from '@mantine/core';
import HomeLayout from '@/components/templates/HomeLayout';
import { useRouter } from 'next/router';
import ProductLayout from '@/components/templates/ProductLayout';
import { useEffect, useState } from 'react';
import { getAllProducts } from './api/productCalls';
import { LayoutSwitcherType, PetProduct } from '../../types';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'rgba(33, 30, 30, 0.96)'
      }
    })
  },
  breakpoints: {
    xxs: '18em'
  }
});

const LayoutSwitcher: React.FC<LayoutSwitcherType> = ({
  children,
  addProduct
}) => {
  const router = useRouter();

  if (router.pathname.startsWith('/product')) {
    return <ProductLayout>{children}</ProductLayout>;
  }
  return <HomeLayout addProduct={addProduct}>{children}</HomeLayout>;
};

const App = ({ Component, pageProps }: AppProps) => {
  const [products, setProducts] = useState<PetProduct[] | null>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const addProduct = (newProduct: PetProduct) => {
    if (!products?.some((product) => product.url === newProduct.url)) {
      setProducts([...(products || []), newProduct]);
    }
  };

  return (
    <MantineProvider theme={theme}>
      <LayoutSwitcher addProduct={addProduct}>
        <Component {...pageProps} products={products} />
      </LayoutSwitcher>
    </MantineProvider>
  );
};

export default App;
