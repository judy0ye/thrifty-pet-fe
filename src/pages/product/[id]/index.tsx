import { getProductById } from '@/pages/api/productCalls';
import { PetProduct } from '@/pages/types';
import {
  Anchor,
  Badge,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<PetProduct | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const selectedProduct = await getProductById(id as string);
        setProduct(selectedProduct.product);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const miscInfo = product?.miscInfo?.map((info, index) => (
    <Text key={index}>{info}</Text>
  ));

  return (
    <>
      <Head>
        <title>Thrifty Pet</title>
        <meta name="description" content="Track pet food prices from Chewy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <Group pt={32} justify="space-around" flex={'nowrap'}>
          <Image
            px={32}
            src={product?.image}
            alt={product?._id}
            h={265}
            style={{ objectFit: 'contain' }}></Image>
          <Stack style={{ wordWrap: 'unset' }}>
            <Title order={2} w={{ base: 'auto', md: 400 }}>
              {product?.title}
            </Title>
            {miscInfo}
            <Badge size="xl" autoContrast color={'#d81111'}>
              <Text>Current Price: ${product?.currentPrice}</Text>
            </Badge>
            <Anchor
              target="_blank"
              underline="hover"
              c={'#1e4cca'}
              href={product?.url}>
              Buy from Chewy
            </Anchor>
          </Stack>
        </Group>
        <SimpleGrid
          py={48}
          style={{ justifyItems: 'center' }}
          cols={{ base: 1, xs: 2 }}
          spacing={{ base: 10, xs: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}>
          <div>
            <Container
              py={28}
              px={48}
              style={{ borderRadius: 8 }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              {product?.averagePrice === 0 ? (
                <Text>Average Price: n/a </Text>
              ) : (
                <Text>Average Price: ${product?.averagePrice}</Text>
              )}
            </Container>
          </div>
          <div>
            <Container
              p={28}
              px={48}
              style={{ borderRadius: 8 }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              {product?.originalPrice === null ? (
                <Text>Original Price: ${product?.currentPrice}</Text>
              ) : (
                <Text>Original Price: ${product?.originalPrice}</Text>
              )}
            </Container>
          </div>
          <div>
            <Container
              p={28}
              px={48}
              style={{ borderRadius: 8 }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              <Text>Lowest Price: ${product?.lowestPrice}</Text>
            </Container>
          </div>
          <div>
            <Container
              p={28}
              px={48}
              style={{ borderRadius: 8 }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              <Text>Highest Price: ${product?.highestPrice}</Text>
            </Container>
          </div>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Product;
