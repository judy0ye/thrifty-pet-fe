import { postProduct } from '@/pages/api/productCalls';
import {
  Container,
  Flex,
  Group,
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
    console.log('clicked in add product');
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
        console.log('product', product);
        console.log('addProduct:', addProduct);
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
          direction={{ base: 'column' }}
          gap={{ base: 'sm' }}
          justify={{ base: 'center' }}
          align={{ base: 'center' }}
          mx={{ base: '1rem', sm: '1.5rem' }}
          h={'100%'}>
          <Group>
            <TextInput
              size="md"
              w={{ base: '100%', xs: '28rem', sm: '20rem', md: '35rem' }}
              placeholder="Enter Chewy Link Here"
              label="Enter a Chewy product link below to see its Prices"
              aria-label="Enter Chewy Link Here"
              rightSection={
                <UnstyledButton type="submit">{icon}</UnstyledButton>
              }
              value={searchInput !== null ? searchInput : ''}
              onChange={handleChange}
            />
          </Group>
        </Flex>
      </form>
    </>
  );
};
