import { Anchor, Burger, Group, Title } from '@mantine/core';
import { type HeaderToggleTypes } from './HeaderToggle.types';
import Link from 'next/link';

export const HeaderToggle = ({
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop
}: HeaderToggleTypes) => {
  return (
    <Group h={'100%'} px={{ base: 8, xs: 'xl', sm: 'md' }}>
      <Burger
        aria-label="Toggle notes"
        opened={mobileOpened}
        onClick={toggleMobile}
        hiddenFrom="sm"
        size="sm"
      />
      <Burger
        aria-label="Toggle notes"
        opened={desktopOpened}
        onClick={toggleDesktop}
        visibleFrom="sm"
        size="sm"
      />
      <Title order={1}>
        <Anchor
          fz={{ base: 34, xs: 36 }}
          fw={'bold'}
          component={Link}
          href={'/'}
          underline="never"
          c={'black'}>
          Thrifty Pet
        </Anchor>
      </Title>
    </Group>
  );
};
