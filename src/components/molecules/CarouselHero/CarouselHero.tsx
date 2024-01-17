import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Flex, Text } from '@mantine/core';
import classes from './CarouselHero.module.css';

const images = [
  { img: '/assets/dog-cat.jpg', alt: 'dog and cat' },
  { img: '/assets/bunny.jpg', alt: 'bunny' },
  { img: '/assets/guinea-pig.jpg', alt: 'guinea_pig' },
  { img: '/assets/food.jpg', alt: 'dry pet food' }
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
          className={classes.carouselImage}
          src={image.img}
          alt={image.alt}
          width={900}
          height={450}
          style={{ objectFit: 'contain' }}
        />
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      align="start"
      slideSize={{ base: '100%', sm: '98%' }}
      slideGap={{ base: 'sm', sm: 2 }}
      withIndicators
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      classNames={classes}>
      {slides}
    </Carousel>
  );
};
