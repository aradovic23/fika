import { useColorMode, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? (
          <MoonIcon className="h-6 w-6 text-base" />
        ) : (
          <SunIcon className="h-6 w-6" />
        )}
      </Button>
    </header>
  );
};

export default ColorModeSwitcher;
