import encryptService from "@/core/encryptService";
import { Card, Heading, Spinner, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Alert } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { ClipboardButton, ClipboardRoot } from "../../components/ui/clipboard";
import { Field } from "../../components/ui/field";
import { DecryptedMessageResult } from "./types";

interface OpenMessageWithoutPasswordProps {
  encryptedMessage: string;
  decryptionData: string;
  handleCloseOpenedMessage(): void;
}

const OpenMessageWithoutPassword = ({
  decryptionData,
  encryptedMessage,
  handleCloseOpenedMessage,
}: OpenMessageWithoutPasswordProps) => {
  const [message, setMessage] = useState<DecryptedMessageResult | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const decryptedMessageResult = await encryptService.decryptMessage(
        encryptedMessage,
        decryptionData
      );

      if (decryptedMessageResult.success) {
        setMessage({
          success: true,
          message: decryptedMessageResult.decryptedMessage,
        });
      } else {
        setMessage({
          success: false,
          error: decryptedMessageResult.errorMessage,
        });
      }
    };
    fetchMessage();
  }, []);

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

export default OpenMessageWithoutPassword;
