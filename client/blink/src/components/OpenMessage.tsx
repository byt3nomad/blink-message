import { Card, Heading, Spinner, Textarea } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { ClipboardButton, ClipboardRoot } from "./ui/clipboard";
import messageService from "@/core/messageService";
import { useEffect, useState } from "react";
import { Alert } from "./ui/alert";
import cryptoService from "@/core/cryptoService";
import { useLocation } from "react-router";
import { Field } from "./ui/field";

interface OpenMessageProps {
  messageId: string;
  handleCloseOpenedMessage(): void;
}

type DecryptedMessageSuccess = {
  success: true;
  message: string;
};
type DecryptedMessageFailure = {
  success: false;
  error: string;
};
type DecryptedMessageResult = DecryptedMessageSuccess | DecryptedMessageFailure;

const OpenMessage = ({
  messageId,
  handleCloseOpenedMessage,
}: OpenMessageProps) => {
  const [message, setMessage] = useState<DecryptedMessageResult | null>(null);
  const encryptionKey = useLocation().hash.slice(1);

  useEffect(() => {
    const fetchMessage = async () => {
      const fetchedMessageResult = await messageService.getMessageContent(
        messageId
      );

      if (fetchedMessageResult.success) {
        const decryptMessageResult = await cryptoService.decryptMessage(
          fetchedMessageResult.encryptedMessage,
          fetchedMessageResult.iv,
          encryptionKey
        );

        if (decryptMessageResult.success) {
          setMessage({ success: true, message: decryptMessageResult.message });
        } else {
          setMessage({
            success: false,
            error: "Decryption of the message failed!",
          });
        }
      } else {
        setMessage({ success: false, error: fetchedMessageResult.error });
      }
    };

    fetchMessage();
  }, [messageId]);

  if (!message) {
    return <Spinner />;
  }

  if (!message.success) {
    return <Alert maxW="700px" w="full" status="error" title={message.error} />;
  }

  return (
    <>
      <Heading textAlign={"center"}>Message Opened </Heading>

      <Card.Root maxW="700px" w="full" size="sm">
        <Card.Header>
          <Heading>Message Content</Heading>
        </Card.Header>
        <Card.Body>
          <Field helperText={`${message.message.length} characters.`}>
            <Textarea
              autoresize
              readOnly={true}
              variant={"subtle"}
              value={message.message}
            ></Textarea>
          </Field>
        </Card.Body>
        <Card.Footer justifyContent={"flex-end"}>
          <Button variant={"ghost"} onClick={handleCloseOpenedMessage}>
            Close
          </Button>
          <ClipboardRoot value={message.message} timeout={1000}>
            <ClipboardButton />
          </ClipboardRoot>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default OpenMessage;
