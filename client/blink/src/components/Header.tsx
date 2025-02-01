import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import { ColorModeButton } from "./ui/color-mode";

const Header = () => {
  return (
    <header>
      <HStack justifyContent={"center"}>
        <HStack
          justifyContent={"space-between"}
          maxW={"700px"}
          w={"full"}
          mx={4}
        >
          <Link to={"/"}>
            <Text fontFamily={"Audiowide"}>Blink Message</Text>
          </Link>
          <HStack>
            <Link
              to={"https://github.com/byt3nomad/blink-message"}
              target="_blank"
            >
              <IconButton variant={"ghost"}>
                <FaGithub />
              </IconButton>
            </Link>
            <ColorModeButton />
          </HStack>
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
