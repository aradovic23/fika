import {
  Avatar,
  ButtonGroup,
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
  { name: 'All Drinks', path: '/drinks' },
  { name: 'Submit Drink', path: '/submit-drink' },
  { name: 'Edit Category', path: '/edit-category' },
  { name: 'Settings', path: '/settings' },
];

const Navbar: FC = () => {
  const { data: sessionData } = useSession();
  const { data: storeData } = api.settings.getStore.useQuery();

  const isAdmin = useIsAdmin();

  return (
    <Flex justifyContent="space-between" alignItems="center" px="10" py="2" gap="5" top="0" width="100%" maxH="64px">
      <HStack as={NextLink} href="/">
        {storeData?.fileUrl && <Image alt="logo" src={storeData?.fileUrl} height="2rem" />}
      </HStack>

      <ButtonGroup gap="2" alignItems="center">
        {isAdmin ? (
          <>
            <Menu>
              <MenuButton as={IconButton} variant="ghost" icon={<Bars3Icon className="h-6 w-6" />}></MenuButton>
              <Portal>
                <MenuList>
                  {navigation.map(item => (
                    <MenuItem as={NextLink} href={item.path} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
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
                  <MenuItem>
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
    </Flex>
  );
};

export default Navbar;
