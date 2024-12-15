import { Card, ClipboardRoot, Heading, Text, VStack } from "@chakra-ui/react";
import { ClipboardButton } from "./ui/clipboard";

interface MessageUrlProps {
  messageId: string;
  encryptionKey: string;
}

const CopyMessageUrl: React.FC<MessageUrlProps> = ({
  encryptionKey,
  messageId,
}) => {
  const origin = window.location.origin;
  const openMessageUrl = `${origin}/${messageId}/${encryptionKey}`;
  return (
    <>
      <VStack px={4} pt={10}>
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
      </VStack>
    </>
  );
};

export default CopyMessageUrl;
