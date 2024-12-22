import { Button } from "@/components/ui/button";
import {
  Box,
  Card,
  ClipboardRoot,
  Heading,
  Image,
  Show,
  Text,
} from "@chakra-ui/react";
import { TbRefresh } from "react-icons/tb";
import urlInfoDark from "../assets/url-dark.svg";
import urlInfoWhite from "../assets/url-white.svg";
import { ClipboardButton } from "./ui/clipboard";
import { useColorMode } from "./ui/color-mode";

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

  const { colorMode } = useColorMode();

  return (
    <>
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
          <Card.Footer justifyContent="center">
            <ClipboardRoot value={openMessageUrl} timeout={1000}>
              <ClipboardButton />
            </ClipboardRoot>
          </Card.Footer>
        </Card.Root>
        <Show
          when={colorMode === "dark"}
          fallback={<Image mt={"7"} src={urlInfoWhite} />}
        >
          <Image mt={"7"} src={urlInfoDark} />
        </Show>
        <Text>
          This application encrypts/decrypts your message on the client side
          using an encryption key that is only available in the URL.The key is
          not sent to the server, so even if the server is compromised, no one
          can read your message without the key from the URL. Once the message
          is read, its content is permanently deleted.
        </Text>
      </Box>
    </>
  );
};

export default CopyMessageUrl;
