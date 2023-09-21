import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Search, XCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  handleSearchChange: (term: string | undefined) => void;
  isLoading: boolean;
}

type FormValues = {
  search: string;
};

export default function InputSearch({ handleSearchChange, isLoading }: Props) {
  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  return (
    <HStack as="form" onSubmit={handleSubmit(data => handleSearchChange(data.search))} align="flex-start" w="full">
      <FormControl isInvalid={!!errors.search}>
        <InputGroup>
          <Input
            id="search"
            placeholder={t('search') ?? 'Type to search...'}
            {...register('search', {
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <InputRightElement cursor="pointer">
            <XCircleIcon
              size="16"
              color="gray"
              onClick={() => {
                handleSearchChange(undefined);
                reset();
              }}
            />
          </InputRightElement>
        </InputGroup>
        {errors.search && <FormErrorMessage>{errors.search?.message}</FormErrorMessage>}
      </FormControl>
      <IconButton type="submit" isLoading={isLoading} aria-label="search" icon={<Search />} colorScheme="primary" />
    </HStack>
  );
}
