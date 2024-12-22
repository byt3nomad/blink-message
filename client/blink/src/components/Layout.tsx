import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <VStack px={4} py={10}>
        <Outlet />
      </VStack>
    </>
  );
};

export default Layout;
