import { Box, Button, MenuItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  return (
    <>
      <MenuItem>
        <Button as={Box} size="xs" variant="ghost" onClick={() => changeLanguage('sr')}>
          🇷🇸 Српски
        </Button>
      </MenuItem>
      <MenuItem>
        <Button as={Box} size="xs" variant="ghost" onClick={() => changeLanguage('en')}>
          🇬🇧 English
        </Button>
      </MenuItem>
    </>
  );
};

export default LanguageSwitcher;
