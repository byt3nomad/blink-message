import { Button } from "@/components/ui/button";
import {
  Box,
  Card,
  ClipboardRoot,
  Heading,
  HStack,
  Image,
  Show,
  Text,
} from "@chakra-ui/react";
import { TbRefresh } from "react-icons/tb";
import urlInfoDark from "../assets/url-dark.svg";
import urlInfoWhite from "../assets/url-white.svg";
import { ClipboardButton } from "./ui/clipboard";
import { useColorMode } from "./ui/color-mode";
import { LuExternalLink } from "react-icons/lu";
import { Link } from "react-router";

interface MessageUrlProps {
  messageId: string;
  encryptionKey: string;
  createNewMessageClicked: () => void;
}

const CopyMessageUrl = ({
  encryptionKey,
  messageId,
  createNewMessageClicked: createNewMessage,
}: MessageUrlProps) => {
  const origin = window.location.origin;
  const openMessageUrl = `${origin}/${messageId}#${encryptionKey}`;
  const handleCreateNewMessageButton = () => {
    createNewMessage();
  };

  return (
    <>
      <Heading textAlign={"center"}>Message Created </Heading>
      <Box maxW="700px" w="full">
        <Box mb={1}>
          <Button
            onClick={handleCreateNewMessageButton}
            variant="ghost"
            size={"sm"}
          >
            <TbRefresh /> Create new message
          </Button>
        </Box>
        <Card.Root maxW="700px" w="full" size="sm">
          <Card.Header>
            <Heading size="md">Open Message URL</Heading>
          </Card.Header>
          <Card.Body>
            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {openMessageUrl}
            </Text>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Link to={openMessageUrl}>
              <HStack>
                Visit Link <LuExternalLink />
              </HStack>
            </Link>
            <ClipboardRoot value={openMessageUrl} timeout={1000}>
              <ClipboardButton />
            </ClipboardRoot>
          </Card.Footer>
        </Card.Root>
      </Box>
    </>
  );
};

export default CopyMessageUrl;
