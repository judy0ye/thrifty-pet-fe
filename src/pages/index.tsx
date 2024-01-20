import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Container } from '@mantine/core'
import ProductCards from '@/components/organisms/ProductCards'
import { PetProduct } from './types'

const inter = Inter({ subsets: ['latin'] })

const Home = ({products}: {products: PetProduct[]}) => {
  return (
    <>
      <Head>
        <title>Thrifty Pet</title>
        <meta name="description" content="Track pet food prices from Chewy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className={`${styles.Container} ${inter.className}`}>
        <ProductCards products={products} />
      </Container>
    </>
  )
}

export default Home