import { useState } from 'react';
import { env } from '../env/client.mjs';
import type { Result, UnsplashImage } from '../../typings';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, HStack, IconButton, Image, Input, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Cloud, Search } from 'lucide-react';

interface Props {
  handleSelectedImage: (image: string, blur: string) => void;
}

const ImageSearch = ({ handleSelectedImage }: Props) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const ACCESS_KEY = env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const BASE_URL = 'https://api.unsplash.com';
  const [selectedImage, setSelectedImage] = useState({
    url: '',
    id: '',
    blurHash: '',
  });
  const [showResults, setShowResults] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery<Result[], Error>(['images'], async () => {
    const response = await fetch(
      `${BASE_URL}/search/photos?page=1&query=${searchTerm}&per_page=30&client_id=${ACCESS_KEY}`,
    );
    const data = (await response.json()) as UnsplashImage;
    return data.results;
  });

  const fetchRequest = async (): Promise<void> => {
    await refetch();
  };

  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetchRequest();
    setSearchTerm('');
    setShowResults(true);
  };

  const handleSetSelectedImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSelectedImage(selectedImage.url, selectedImage.blurHash);
    setShowResults(false);
  };

  return (
    <>
      <HStack w="full">
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          inputMode="search"
          placeholder={t('elements.placeholder.image_search') ?? 'Search'}
        />
        <IconButton
          aria-label="search"
          icon={<Search />}
          onClick={onSubmitHandler}
          colorScheme="primary"
          variant="outline"
        />
      </HStack>
      {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}
      {isError && <Text>Error fetching data</Text>}
      {showResults && (
        <SimpleGrid spacing="2" minChildWidth="150px" mt="4" p="5" rounded="lg" maxH="30rem" overflowY="auto" w="full">
          {data?.map(image => (
            <Box key={image.id} position="relative">
              {selectedImage.id === image.id && (
                <Button
                  onClick={handleSetSelectedImage}
                  position="absolute"
                  bottom={0}
                  width="full"
                  zIndex={5}
                  size="sm"
                  colorScheme="primary"
                  variant="solid"
                  leftIcon={<Cloud />}
                >
                  {t('elements.button.select')}
                </Button>
              )}
              <Box position="relative">
                <Image
                  alt="searchImage"
                  onClick={() =>
                    setSelectedImage({
                      url: image.urls.regular,
                      id: image.id,
                      blurHash: image.blur_hash ?? '',
                    })
                  }
                  src={image.urls.small}
                  rounded="lg"
                  zIndex={2}
                  objectFit="cover"
                  position="relative"
                  boxSize="200px"
                />
                {selectedImage.id === image.id && (
                  <Image
                    alt="searchImage"
                    src={image.urls.small}
                    rounded="lg"
                    position="absolute"
                    inset={0}
                    filter="blur(5px)"
                    zIndex={0}
                    transform="scale(1.05)"
                    objectFit="cover"
                    boxSize="200px"
                  />
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ImageSearch;
