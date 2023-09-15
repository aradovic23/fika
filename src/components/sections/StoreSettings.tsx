import { VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { api } from '../../utils/api';
import CreateStoreForm from '../CreateStoreForm';
import EditStoreForm from '../EditStoreForm';
import Notice from '../Notice';

export default function StoreSettings() {
  const { data: storeData } = api.settings.getStore.useQuery();

  const { t } = useTranslation('common');

  if (!storeData) {
    return (
      <VStack spacing={5} mb={5}>
        {!storeData && (
          <Notice
            status="info"
            title={t('settings.no_store_title') ?? 'No store yet'}
            description={t('settings.no_store_description') ?? 'Please add new store'}
          />
        )}
        {!storeData && <CreateStoreForm />}
      </VStack>
    );
  }

  return <EditStoreForm {...storeData} />;
}
