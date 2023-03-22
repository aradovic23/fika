import { Box, Image, Text } from "@chakra-ui/react";
import type { FC } from "react";

interface Props {
  name?: string;
  logo?: string;
  id?: number;
}

const StoreInfo: FC<Props> = ({ name, logo, id }) => {
  return (
    <Box>
      <Text>Name: {name}</Text>
      <Image src={logo} alt="logo" boxSize="sm" />
      <Text>{id}</Text>
    </Box>
  );
};

export default StoreInfo;
