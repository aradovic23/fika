import { Image, Text, VStack } from "@chakra-ui/react";
import type { FC } from "react";

interface Props {
  name?: string;
  logo?: string;
  id?: number;
}

const StoreInfo: FC<Props> = ({ name, logo }) => {
  return (
    <VStack>
      <Text>Store name: {name}</Text>
      <Image
        src={logo}
        alt="logo"
        objectFit="cover"
        boxSize="sm"
        rounded="md"
      />
    </VStack>
  );
};

export default StoreInfo;
