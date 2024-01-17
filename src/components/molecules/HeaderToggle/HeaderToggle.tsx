import { Burger, Group, Title } from "@mantine/core"
import { type HeaderToggleTypes } from "./HeaderToggle.types";

export const HeaderToggle = ({mobileOpened, desktopOpened, toggleMobile, toggleDesktop}: HeaderToggleTypes) => {

  return (
      <Group h={'100%'} px={'lg'}>
        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
        <Title order={1}>Thrifty Pet</Title>
      </Group>
  )
}