import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box>
        <Navbar />
        {children}
      </Box>
    </>
  );
};

export default Layout;
