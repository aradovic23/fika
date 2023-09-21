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
import { Globe2, Menu as MenuIcon } from 'lucide-react';
import NextLink from 'next/link';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';
import LanguageSwitcher from './LanguageSwitcher';
import { STALE_TIME } from '../constants';

const Navbar: FC = () => {
  const { t } = useTranslation('common');

  const navigationLinks = [
    { name: t('nav.links.all_drinks'), path: '/products', isAdmin: true },
    { name: t('nav.links.submit_product'), path: '/submit-drink', isAdmin: true },
    { name: t('nav.links.edit_category'), path: '/edit-category', isAdmin: true },
    { name: t('nav.links.settings'), path: '/settings', isAdmin: true },
  ];

  const { data: storeData } = api.settings.getStore.useQuery(undefined, { staleTime: STALE_TIME });
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
                <MenuButton as={IconButton} variant="ghost" icon={<MenuIcon />}></MenuButton>
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
              <MenuButton as={IconButton} variant="ghost" icon={<Globe2 />} />
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
