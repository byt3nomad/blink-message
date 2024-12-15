import { Button } from "@/components/ui/button";
import { Box, Card, ClipboardRoot, Heading, Text } from "@chakra-ui/react";
import { TbRefresh } from "react-icons/tb";
import { ClipboardButton } from "./ui/clipboard";

interface MessageUrlProps {
  messageId: string;
  encryptionKey: string;
  createNewMessageClicked: () => void;
}

const CopyMessageUrl: React.FC<MessageUrlProps> = ({
  encryptionKey,
  messageId,
  createNewMessageClicked: createNewMessage,
}) => {
  const origin = window.location.origin;
  const openMessageUrl = `${origin}/open#${messageId}/${encryptionKey}`;
  const handleCreateNewMessageButton = () => {
    createNewMessage();
  };

  return (
    <>
      <Box maxW="700px" w="full">
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
    </>
  );
};

export default CopyMessageUrl;
