import { Card, Heading, Textarea } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { ClipboardButton, ClipboardRoot } from "../../components/ui/clipboard";
import { Field } from "../../components/ui/field";

interface MessageCardProps {
  decryptedMessage: string;
  handleCloseOpenedMessage(): void;
}

const MessageCard = ({
  decryptedMessage,
  handleCloseOpenedMessage,
}: MessageCardProps) => {
  return (
    <>
      <Heading textAlign={"center"}>Message Opened </Heading>
      <Card.Root maxW="700px" w="full" size="sm">
        <Card.Header>
          <Heading>Message Content</Heading>
        </Card.Header>
        <Card.Body>
          <Field helperText={`${decryptedMessage.length} characters.`}>
            <Textarea
              autoresize
              readOnly={true}
              variant={"subtle"}
              value={decryptedMessage}
            ></Textarea>
          </Field>
        </Card.Body>
        <Card.Footer justifyContent={"flex-end"}>
          <Button variant={"ghost"} onClick={handleCloseOpenedMessage}>
            Close
          </Button>
          <ClipboardRoot value={decryptedMessage} timeout={1000}>
            <ClipboardButton />
          </ClipboardRoot>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default MessageCard;
