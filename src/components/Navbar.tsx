import { useSession } from "next-auth/react";
import NextLink from "next/link";
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import ColorModeSwitcher from "./ColorModeSwitcher";
import {
  Avatar,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Link,
} from "@chakra-ui/react";
import AdminInfo from "./AdminInfo";

const navigation = [
  { name: "All Drinks", path: "/drinks" },
  { name: "Submit Drink", path: "/submit-drink" },
  { name: "Edit Category", path: "/edit-category" },
];

const COMPANY_NAME = "Drinks App";

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      px="5"
      py="2"
      shadow="md"
      gap="5"
      top="0"
      width="100%"
      maxH="64px"
    >
      <Heading size="md" as={NextLink} href="/">
        {COMPANY_NAME}
      </Heading>

      <ButtonGroup gap="2" alignItems="center">
        <ColorModeSwitcher />
        {sessionData?.user?.role === "admin" ? (
          <>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<Bars3Icon className="h-6 w-6" />}
              ></MenuButton>
              <Portal>
                <MenuList>
                  {navigation.map((item) => (
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
                name={sessionData?.user?.name ?? "Admin"}
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
