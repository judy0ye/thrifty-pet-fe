import { Anchor, Card, Flex, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { PetProduct } from '../../../types';
import { useRef, useState } from 'react';

export const ProductCards = ({ products }: { products: PetProduct[] }) => {
  const [hoveredState, setHoveredState] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMouseEnter = (index: number) => {
    setHoveredState(index);
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const allProducts = products?.map((product, index) => (
    <Anchor
      component={Link}
      href={{ pathname: `/product/${product._id}` }}
      key={index}>
      <Card
        w={{ base: 250, xs: 300 }}
        shadow="sm"
        m={30}
        padding="lg"
        radius="md"
        withBorder
        ref={(ref) => (cardRefs.current[index] = ref)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: 'box-shadow 0.3s ease-in-out',
          boxShadow:
            hoveredState === index ? '0 10px 20px rgba(0, 0, 0, 0.5)' : '0 0 0'
        }}>
        <Card.Section>
          <Image
            src={product.image}
            height={200}
            style={{ objectFit: 'contain' }}
            alt={product.title}
            p={10}
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500} lineClamp={2}>
            {product.title}
          </Text>
        </Group>

        <Text size="sm" c="rgb(86 97 103)">
          ${product.currentPrice.toFixed(2)}
        </Text>
      </Card>
    </Anchor>
  ));
  return (
    <Flex justify={'center'} wrap={{ base: 'wrap' }}>
      {allProducts}
    </Flex>
  );
};
