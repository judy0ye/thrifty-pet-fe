import { AppShell, AppShellMain } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProductLayoutTypes } from './ProductLayout.types';
import HeaderToggle from '@/components/molecules/HeaderToggle';
import Notes from '@/components/organisms/Notes';

export const ProductLayout = ({ children }: ProductLayoutTypes) => {
  const [mobileOpened, toggleMobile] = useDisclosure();
  const [desktopOpened, toggleDesktop] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: { base: 150, xxs: 110, xs: 100 } }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}>
      <AppShell.Header>
        <HeaderToggle
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
          toggleMobile={toggleMobile.toggle}
          toggleDesktop={toggleDesktop.toggle}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <Notes />
      </AppShell.Navbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
};
