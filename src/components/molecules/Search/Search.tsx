import { postProduct } from '@/pages/api/productCalls';
import {
  Container,
  Flex,
  InputLabel,
  Loader,
  Text,
  TextInput,
  UnstyledButton,
  rem
} from '@mantine/core';
import { useState } from 'react';
import { SearchTypes } from './Search.types';
import { IconSearch } from '@tabler/icons-react';

export const Search = ({ addProduct }: SearchTypes) => {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const icon = (
    <IconSearch
      style={{ width: rem(19), height: rem(19), marginTop: rem(5) }}
    />
  );

  const isValidProduct = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes('chewy.com')) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAlert(null);
    setSearchInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput !== null) {
      addProductToDisplay(searchInput);
      setSearchInput(null);
    }
  };

  const addProductToDisplay = async (searchInput: string) => {
    try {
      const isValidLink = isValidProduct(searchInput);
      if (!isValidLink) {
        setAlert('Please enter a valid Chewy link');
      } else {
        setLoading(true);
        const product = await postProduct(searchInput);
        addProduct(product.product);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Text style={{ alignSelf: 'center' }}>{alert}</Text>
      {loading && (
        <Loader
          style={{ alignSelf: 'center' }}
          color="rgba(61, 55, 55, 1)"
          size="xl"
          type="dots"
        />
      )}
      <form onSubmit={handleSubmit}>
        <Flex
          gap={{ base: 'sm' }}
          justify={{ base: 'center' }}
          align={{ base: 'center' }}
          mx={{ base: '1.6rem', sm: '1.5rem' }}
          pb={{ base: 16, sm: 0 }}
          h={'100%'}>
          <Container m={0} p={0}>
            <InputLabel htmlFor="chewy-link">
              Enter a Chewy product link and check back periodically to see its
              price ranges
            </InputLabel>
            <TextInput
              size="md"
              w={{ base: '100%', xs: '28rem', sm: '26.2rem', md: '35rem' }}
              placeholder="Enter Chewy Link Here"
              id="chewy-link"
              aria-label="Enter Chewy Link Here"
              rightSection={
                <UnstyledButton aria-label="search" type="submit">
                  {icon}
                </UnstyledButton>
              }
              value={searchInput !== null ? searchInput : ''}
              onChange={handleChange}
            />
          </Container>
        </Flex>
      </form>
    </>
  );
};
