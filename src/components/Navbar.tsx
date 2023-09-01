import {
  Avatar,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { LanguageIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import type { FC } from 'react';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { api } from '../utils/api';
import AdminInfo from './AdminInfo';
import LanguageSwitcher from './LanguageSwitcher';

const navigation = [
  { name: 'All Drinks', path: '/drinks', isAdmin: true },
  { name: 'Submit Drink', path: '/submit-drink', isAdmin: true },
  { name: 'Edit Category', path: '/edit-category', isAdmin: true },
  { name: 'Settings', path: '/settings', isAdmin: true },
];

const Navbar: FC = () => {
  const { data: sessionData } = useSession();
  const { data: storeData } = api.settings.getStore.useQuery();

  const isAdmin = useIsAdmin();

  return (
    <Container maxW="6xl">
      <HStack justifyContent="space-between" alignItems="center" py="2" gap="5" top="0" width="100%" maxH="64px">
        <HStack as={NextLink} href="/">
          {storeData?.fileUrl && <Image alt="logo" src={storeData?.fileUrl} minH="30px" maxH="40px" />}
        </HStack>

        <ButtonGroup gap="2" alignItems="center">
          {isAdmin ? (
            <>
              <Menu>
                <MenuButton as={IconButton} variant="ghost" icon={<Bars3Icon className="h-6 w-6" />}></MenuButton>
                <MenuList>
                  {navigation.map(item => (
                    <MenuItem
                      zIndex={99999}
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
              <Menu>
                <MenuButton
                  as={Avatar}
                  size="sm"
                  src={sessionData?.user?.image}
                  name={sessionData?.user?.name ?? 'Admin'}
                  height="9"
                  width="9"
                ></MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem
                      _hover={{
                        background: 'transparent',
                      }}
                    >
                      <AdminInfo sessionData={sessionData} />
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
              <Menu>
                <MenuButton as={IconButton} variant="ghost" icon={<LanguageIcon className="h-6 w-6" />} />
                <MenuList>
                  <LanguageSwitcher />
                </MenuList>
              </Menu>
            </>
          ) : (
            <Menu>
              <MenuButton as={IconButton} variant="ghost" icon={<LanguageIcon className="h-6 w-6" />} />
              <MenuList>
                <LanguageSwitcher />
              </MenuList>
            </Menu>
          )}
        </ButtonGroup>
      </HStack>
    </Container>
  );
};

export default Navbar;
