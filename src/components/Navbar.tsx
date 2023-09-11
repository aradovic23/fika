import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { UserButton } from '@clerk/nextjs';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { LanguageIcon } from '@heroicons/react/24/solid';
import NextLink from 'next/link';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: FC = () => {
  const { t } = useTranslation('common');

  const navigationLinks = [
    { name: t('nav.links.all_drinks'), path: '/drinks', isAdmin: true },
    { name: t('nav.links.submit_product'), path: '/submit-drink', isAdmin: true },
    { name: t('nav.links.edit_category'), path: '/edit-category', isAdmin: true },
    { name: t('nav.links.edit_category'), path: '/settings', isAdmin: true },
  ];

  const { data: storeData } = api.settings.getStore.useQuery();
  const isAdmin = useIsAdmin();

  return (
    <Container maxW="6xl">
      <HStack justifyContent="space-between" alignItems="center" py="2" gap="5" top="0" width="100%" maxH="64px">
        <Box as={NextLink} href="/">
          {storeData?.fileUrl && <Image alt="logo" src={storeData?.fileUrl} minH="30px" maxH="40px" />}
        </Box>

        <ButtonGroup gap="2" alignItems="center">
          <>
            {isAdmin && (
              <Menu>
                <MenuButton as={IconButton} variant="ghost" icon={<Bars3Icon className="h-6 w-6" />}></MenuButton>
                <MenuList zIndex={99999}>
                  {navigationLinks.map(item => (
                    <MenuItem
                      as={NextLink}
                      href={item.path}
                      key={item.name}
                      color={isAdmin ? 'magenta.100' : undefined}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
            <Menu>
              <MenuButton as={IconButton} variant="ghost" icon={<LanguageIcon className="h-6 w-6" />} />
              <MenuList>
                <LanguageSwitcher />
              </MenuList>
            </Menu>
            <UserButton />
          </>
        </ButtonGroup>
      </HStack>
    </Container>
  );
};

export default Navbar;
