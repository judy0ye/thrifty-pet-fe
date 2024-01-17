import { Button, Flex, TextInput } from "@mantine/core"
import { useState } from "react";

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <form>
      <Flex
        direction={{ base: 'column', xs: 'row' }}
        gap={{ base: 'sm' }}
        justify={{ base: 'center' }}
        align={{base: 'center'}}
        mx={{base:'1rem', sm: '1.5rem'}}
        h={'100%'}
      >
        <TextInput
          size="md"
          w={{base: '100%', xs: '28rem', sm: '20rem', md: '35rem'}}
          placeholder="Enter Chewy Link Here"
          aria-label="Enter Chewy Link Here"
          value={searchInput}
          onChange={(event) => setSearchInput(event.currentTarget.value)}
        />
        <Button type="submit" variant="filled" color="rgba(33, 30, 30, 0.96)" radius="md" size="md">Search</Button>
      </Flex>
    </form>
  )
}