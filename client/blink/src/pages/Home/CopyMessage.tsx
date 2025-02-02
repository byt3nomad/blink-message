import { Button } from "@/components/ui/button";
import { ClipboardButton } from "@/components/ui/clipboard";
import {
  Box,
  Card,
  ClipboardRoot,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { TbRefresh } from "react-icons/tb";
import { Link } from "react-router";

interface CopyMessageProps {
  messageId: string;
  encryptionKey: string;
  createNewMessageClicked: () => void;
}

const CopyMessage = ({
  encryptionKey,
  messageId,
  createNewMessageClicked: createNewMessage,
}: CopyMessageProps) => {
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

export default CopyMessage;
