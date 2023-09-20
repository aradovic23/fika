import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
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
    <HStack as="form" onSubmit={handleSubmit(data => handleSearchChange(data.search))} align="flex-start">
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
              className="h-4 w-4 text-martinique-300"
              onClick={() => {
                handleSearchChange(undefined);
                reset();
              }}
            />
          </InputRightElement>
        </InputGroup>
        {errors.search && <FormErrorMessage>{errors.search?.message}</FormErrorMessage>}
      </FormControl>
      <IconButton
        type="submit"
        isLoading={isLoading}
        aria-label="search"
        icon={<MagnifyingGlassIcon className="h-5 w-5 text-martinique-100" />}
        colorScheme="primary"
      />
    </HStack>
  );
}
