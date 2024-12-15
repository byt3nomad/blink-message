import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <VStack px={4} pt={10}>
      <Outlet />
    </VStack>
  );
};

export default Layout;
