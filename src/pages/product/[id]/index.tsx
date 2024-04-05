import { getProductById } from '@/pages/api/productCalls';
import { PetProduct } from '../../../../types';
import {
  Anchor,
  Badge,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Loader,
  Flex,
  Grid
} from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IconCash,
  IconGraph,
  IconTrendingDown,
  IconTrendingUp
} from '@tabler/icons-react';

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<PetProduct | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const selectedProduct = await getProductById(id as string);
        setProduct(selectedProduct.product);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const miscInfo = product?.miscInfo?.map((info, index) => (
    <Text key={index}>{info}</Text>
  ));

  return loading ? (
    <Flex pt={16} justify={'center'}>
      <Loader color="rgba(61, 55, 55, 1)" size="xl" type="dots" />
    </Flex>
  ) : product ? (
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
              <Text>Current Price: ${product?.currentPrice.toFixed(2)}</Text>
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
        <Grid py={48} justify="center">
          <Grid.Col span={{ base: 12, sm: 10, md: 8, lg: 6 }}>
            <Container
              py={28}
              px={45}
              style={{ borderRadius: 8, justifyContent: 'center' }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              <Flex justify={'center'}>
                <Group>
                  <IconGraph />
                  {product?.averagePrice === 0 ? (
                    <Text>Average Price: n/a </Text>
                  ) : (
                    <Text>Average Price: ${product?.averagePrice?.toFixed(2)}</Text>
                  )}
                </Group>
              </Flex>
            </Container>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 10, md: 8, lg: 6 }}>
            <Container
              p={28}
              px={45}
              style={{ borderRadius: 8 }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              <Flex justify={'center'}>
                <Group>
                  <IconCash />
                  {product?.originalPrice === null ? (
                    <Text>Original Price: ${product?.currentPrice.toFixed(2)}</Text>
                  ) : (
                    <Text>Original Price: ${product?.originalPrice?.toFixed(2)}</Text>
                  )}
                </Group>
              </Flex>
            </Container>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 10, md: 8, lg: 6 }}>
            <Container
              p={28}
              px={45}
              style={{ borderRadius: 8 }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              <Flex justify={'center'}>
                <Group>
                  <IconTrendingDown />
                  <Text>Lowest Price: ${product?.lowestPrice?.toFixed(2)}</Text>
                </Group>
              </Flex>
            </Container>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 10, md: 8, lg: 6 }}>
            <Container
              p={28}
              px={45}
              style={{ borderRadius: 8 }}
              size="responsive"
              c="white"
              bg={'rgba(33, 30, 30, 0.96)'}>
              <Flex justify={'center'}>
                <Group>
                  <IconTrendingUp />
                  <Text>Highest Price: ${product?.highestPrice?.toFixed(2)}</Text>
                </Group>
              </Flex>
            </Container>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  ) : (
    <>
      <Group p={16} justify="center">
        <Text>Opps, Nothing to See Here. Please try again!</Text>
      </Group>
      <Image
        src={'/assets/error.jpg'}
        alt="a cat starting at a dog"
        width={300}
        height={400}
        style={{ objectFit: 'contain' }}
      />
    </>
  );
};

export default Product;
