import Head from 'next/head'
import { Container } from '@mantine/core'
import ProductCards from '@/components/organisms/ProductCards'
import { PetProduct } from '../../types'

const Home = ({products}: {products: PetProduct[]}) => {
  return (
    <>
      <Head>
        <title>Thrifty Pet</title>
        <meta name="description" content="Track pet product prices from Chewy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid >
        <ProductCards products={products} />
      </Container>
    </>
  )
}

export default Home