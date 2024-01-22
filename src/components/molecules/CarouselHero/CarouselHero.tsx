import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Flex, Text } from '@mantine/core';
import classes from './CarouselHero.module.css';

const images = [
  {
    img: '/assets/dog-cat.jpeg',
    blur: './assets/dog-cat-low-quality.jpg',
    alt: 'dog and cat'
  },
  {
    img: '/assets/bunny.jpg',
    blur: './assets/bunny-low-quality.jpg',
    alt: 'bunny'
  },
  {
    img: '/assets/guinea-pig.jpeg',
    blur: './assets/guinea-pig-low-quality.jpg',
    alt: 'guinea_pig'
  },
  {
    img: '/assets/food.jpeg',
    blur: './assets/food-low-quality.jpg',
    alt: 'dry pet food'
  }
];

export const CarouselHero = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const slides = images.map((image) => (
    <Carousel.Slide key={image.img}>
      <Flex align={'center'} bg={'#333333'}>
        <Text className={classes.text}>
          Get the Best Prices for Your Fur Babies
        </Text>
        <Image
          placeholder="blur"
          blurDataURL={image.blur}
          className={classes.carouselImage}
          src={image.img}
          alt={image.alt}
          width={800}
          height={450}
          style={{ objectFit: 'contain' }}
        />
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      previousControlProps={{
        'aria-label': 'Previous'
      }}
      nextControlProps={{
        'aria-label': 'Next'
      }}
      align="start"
      slideSize={{ base: '100%', sm: '98%' }}
      slideGap={{ base: 5, xs: 2 }}
      withIndicators
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      classNames={classes}>
      {slides}
    </Carousel>
  );
};
