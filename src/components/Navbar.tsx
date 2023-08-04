import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import ColorModeSwitcher from './ColorModeSwitcher';
import {
  Avatar,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Link,
  HStack,
  Image,
} from '@chakra-ui/react';
import AdminInfo from './AdminInfo';
import { api } from '../utils/api';

const navigation = [
  { name: 'All Drinks', path: '/drinks' },
  { name: 'Submit Drink', path: '/submit-drink' },
  { name: 'Edit Category', path: '/edit-category' },
  { name: 'Settings', path: '/settings' },
];

const Navbar: FC = () => {
  const { data: sessionData } = useSession();
  const { data: storeData } = api.settings.getStore.useQuery();

  return (
    <Flex justifyContent="space-between" alignItems="center" px="10" py="2" gap="5" top="0" width="100%" maxH="64px">
      <HStack as={NextLink} href="/">
        {storeData?.fileUrl && <Image alt="logo" src={storeData?.fileUrl} height="2rem" />}
      </HStack>

      <ButtonGroup gap="2" alignItems="center">
        {/* <ColorModeSwitcher /> */}
        {sessionData?.user?.role === 'ADMIN' ? (
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
          </>
        ) : (
          <Link as={NextLink} href="/drinks">
            All drinks
          </Link>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Navbar;
