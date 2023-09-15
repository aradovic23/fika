import { Button, FormControl, FormErrorMessage, Icon, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { Select } from 'chakra-react-select';
import { useState } from 'react';
import { api } from '../../utils/api';

interface Option {
  label: string;
  value: string;
}

interface Props {
  addToRecommended: boolean;
  title: string;
}

export function BulkUpdateRecomendations({ addToRecommended, title }: Props) {
  const { data } = api.recommendations.getRecommendations.useQuery({ flag: !addToRecommended });

  const [values, setValues] = useState<readonly Option[]>([]);

  const options = data?.drinks?.map(drink => ({
    value: drink.id,
    label: drink.title,
  }));

  const utils = api.useContext();

  const toast = useToast();

  const {
    mutate: updateRecommendationsMutation,
    isLoading,
    isError,
    error,
  } = api.recommendations.bulkUpdateRecomendations.useMutation({
    async onSuccess(data) {
      toast({
        title: `${data?.count ?? 'products'} ${addToRecommended ? 'added' : 'removed'}`,
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      setValues([]);
      await utils.recommendations.getRecommendations.invalidate();
    },
    onError(error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        colorScheme: 'offRed',
      });
    },
  });

  function handleUpdate() {
    const ids: string[] = values?.map(v => v.value);
    updateRecommendationsMutation({ ids, flag: addToRecommended });
  }

  return (
    <Stack direction={['column', 'column', 'column', 'row']} w="full" spacing={5}>
      <Icon as={addToRecommended ? PlusCircleIcon : MinusCircleIcon} boxSize={6} color="primary.300" />
      <VStack flex={1} alignItems="flex-start" spacing="1">
        <Text>{title}</Text>
        <Text fontSize="sm" color="gray.500">
          {addToRecommended ? 'Products that are not recommended:' : 'Products in recommended section:'}{' '}
          <Text as="span" fontWeight="bold">
            {data?.count}
          </Text>
        </Text>
      </VStack>
      <Stack direction={['column', 'column', 'column', 'row']}>
        <FormControl isInvalid={isError}>
          <Select
            options={options}
            isMulti
            onChange={setValues}
            value={values}
            placeholder="Click here or type to select products"
            closeMenuOnSelect={false}
            isLoading={isLoading}
          />
          {isError && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
        <Button onClick={handleUpdate} colorScheme="primary" isLoading={isLoading} isDisabled={values.length < 1}>
          Update
        </Button>
      </Stack>
    </Stack>
  );
}
