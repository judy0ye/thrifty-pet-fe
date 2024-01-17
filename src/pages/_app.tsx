// import '@/styles/globals.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import HomeLayout from '@/components/templates/HomeLayout';
import { useRouter } from 'next/router';
import ProductLayout from '@/components/templates/ProductLayout';
import { ReactNode } from 'react';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const LayoutSwitcher = ({children}: {children: ReactNode}) => {
  const router = useRouter()

  if (router.pathname.startsWith('/product')) {
    return <ProductLayout>{children}</ProductLayout>
  }
  return <HomeLayout>{children}</HomeLayout>
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={theme}>
      <LayoutSwitcher>
        <Component {...pageProps} />
      </LayoutSwitcher>
    </MantineProvider>
  );
}

export default App