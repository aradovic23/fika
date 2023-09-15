import { Box, HStack, IconButton, Input, Text, useToast } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import type { Unit } from '@prisma/client';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../utils/api';

interface Props {
  handleNewUnit: (state: boolean) => void;
}

const CreateVolumeOption: FC<Props> = ({ handleNewUnit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Unit>();

  const createVolumeOption = api.volume.createVolumeOption.useMutation();

  const toast = useToast();

  const utils = api.useContext();

  const handleCreateVolumeOption = async (data: Unit) => {
    await createVolumeOption.mutateAsync(
      {
        amount: data.amount,
      },
      {
        onSuccess: () => {
          toast({
            title: `Created volume amount ${data.amount}`,
            status: 'success',
            isClosable: true,
            position: 'top',
          });
          void utils.volume.getVolumeOptions.invalidate();
          handleNewUnit(false);
          reset();
        },
        onError: () => {
          toast({
            title: 'Duplicate',
            description: `Volume with ${data.amount} amount already exists. Add a different option.`,
            status: 'warning',
            isClosable: true,
            position: 'top',
          });
          reset();
        },
      }
    );
  };

  return (
    <Box w="full" border="1px solid" borderColor="primary.100" mt="3" bg="whiteAlpha.800" p="5" rounded="lg">
      <HStack spacing={5}>
        <Input
          variant="filled"
          placeholder="Enter volume amount (For example 0.30 or 0.05)"
          {...register('amount', {
            required: true,
            pattern: {
              value: /^\d{1,3}\.\d{2,3}$/,
              message: 'Volume unit should have at least 3 characters (e.g 0.30)',
            },
          })}
        />
        <IconButton
          aria-label="volume-add"
          icon={<PlusIcon className="h-6 w-6" />}
          onClick={handleSubmit(handleCreateVolumeOption)}
          isLoading={isSubmitting && !errors}
          colorScheme="primary"
        />
      </HStack>
      {errors.amount && <Text color="red.300">{errors.amount.message}</Text>}
    </Box>
  );
};

export default CreateVolumeOption;
