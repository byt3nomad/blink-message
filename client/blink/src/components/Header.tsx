import { Box, Flex, HStack, IconButton, Stack, VStack } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { TbMessageChatbot } from "react-icons/tb";
import { ColorModeButton } from "./ui/color-mode";
import { Tooltip } from "./ui/tooltip";
import { Link, useNavigate } from "react-router";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const handleHomeButtonClick = () => {
    navigate("/", { state: { reset: true } });
  };

  return (
    <Box>
      <HStack justifyContent={"center"}>
        <HStack justifyContent={"space-between"} maxW={"700px"} w={"full"}>
          <Tooltip content="Back to homepage">
            <IconButton onClick={handleHomeButtonClick} variant={"plain"}>
              <TbMessageChatbot />
            </IconButton>
          </Tooltip>
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
    </Box>
  );
};

export default Header;
