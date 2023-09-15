import { Button, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { api } from '../../utils/api';

export default function StoreSettingsDelete({ id }: { id: number }) {
  const utils = api.useContext();

  const { t } = useTranslation('common');

  const { mutate: deleteStore } = api.settings.deleteStore.useMutation({
    async onSuccess() {
      await utils.settings.getStore.invalidate();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleDeleteStore = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this store?')) {
      return;
    }
    deleteStore({ id });
  };

  if (!id) {
    return null;
  }

  return (
    <Stack
      w="full"
      border="1px solid"
      borderColor="offRed.200"
      rounded="lg"
      p="5"
      justify="space-between"
      align="baseline"
      direction={['column', 'column', 'row', 'row']}
    >
      <Text>{t('settings.delete_description')}</Text>
      <Button variant="ghost" colorScheme="red" onClick={() => handleDeleteStore(id)} w={{ base: 'full', md: '200px' }}>
        {t('settings.delete_store')}
      </Button>
    </Stack>
  );
}
