import { AppShell, AppShellMain, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { HomeLayoutTypes } from './HomeLayout.types';
import HeaderToggle from '@/components/molecules/HeaderToggle';
import Search from '@/components/molecules/Search';
import CarouselHero from '@/components/molecules/CarouselHero';
import Notes from '@/components/organisms/Notes';

export const HomeLayout = ({ children, addProduct }: HomeLayoutTypes) => {
  const [mobileOpened, toggleMobile] = useDisclosure();
  const [desktopOpened, toggleDesktop] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: { base: 185, xxs: 175, xs: 160, sm: 125 } }}
      navbar={{
        width: { base: 225, md: 250 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}>
      <AppShell.Header>
        <Flex
          h={'100%'}
          direction={{ base: 'column', sm: 'row' }}
          justify={{ base: 'space-around', sm: 'space-between' }}>
          <HeaderToggle
            mobileOpened={mobileOpened}
            desktopOpened={desktopOpened}
            toggleMobile={toggleMobile.toggle}
            toggleDesktop={toggleDesktop.toggle}
          />
          <Search addProduct={addProduct} />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Notes />
      </AppShell.Navbar>
      <AppShellMain>
        <CarouselHero />
        {children}
      </AppShellMain>
    </AppShell>
  );
};
