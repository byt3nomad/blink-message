import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import cryptoService from "@/core/cryptoService";
import messageService from "@/core/messageService";
import {
  Box,
  Card,
  Code,
  Heading,
  Image,
  Show,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import urlInfoDark from "../assets/url-dark.svg";
import urlInfoWhite from "../assets/url-white.svg";
import { useColorMode } from "./ui/color-mode";

const MAX_CHAR_LIMIT = 5000;

export type CreatedMessage = {
  id: string;
  key: string;
};

interface MessageFormProps {
  onSuccess: (createdMessage: CreatedMessage) => void;
}
const CreateMessageForm = ({ onSuccess }: MessageFormProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { colorMode } = useColorMode();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setError(null);

    const { encryptedMessage, key, iv } = await cryptoService.encryptMessage(
      message
    );
    const response = await messageService.createMessage(encryptedMessage, iv);

    if (response.success) {
      onSuccess({ id: response.messageId, key });
    } else {
      setError(response.error);
    }

    setSubmitting(false);
    setMessage("");
  };
  return (
    <VStack maxW={"750px"} w={"full"} gap={24}>
      <VStack gap={1}>
        <Heading textAlign={"center"} fontFamily={"Montserrat"}>
          Exchange confidential data while ensuring total privacy
        </Heading>
        <Code>client side encryption with AES 256</Code>
      </VStack>
      <Box w={"full"}>
        <Card.Root size="sm">
          <form onSubmit={handleSubmit}>
            <Card.Header>
              <Heading size="md">Message</Heading>
            </Card.Header>
            <Card.Body>
              <Field
                required
                helperText={`${message.length}/${MAX_CHAR_LIMIT} used characters.`}
              >
                <Textarea
                  size={"lg"}
                  resize="none"
                  autoresize
                  maxLength={MAX_CHAR_LIMIT}
                  value={message}
                  placeholder="Start typing..."
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Field>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button loading={submitting} type="submit">
                Create link
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
        {error && (
          <Alert
            mt={3}
            status="error"
            title={`There was an error processing your request: ${error}`}
          />
        )}
      </Box>
      <VStack gap="2" alignItems="flex-start">
        <Heading as="h2">Message Encryption</Heading>
        <Show
          when={colorMode === "dark"}
          fallback={<Image src={urlInfoWhite} />}
        >
          <Image src={urlInfoDark} />
        </Show>
        <Text as="p">
          To protect your messages, we first use the native crypto.subtle API in
          your browser to generate a secure AES-256 key, which is then used to
          encrypt your message entirely on your device before anything is sent
          to our server. Only the encrypted message is transmitted, while the
          actual key is stored in the URL, ensuring the server itself has no
          access to your decryption key and cannot read the content of your
          message.
        </Text>
      </VStack>
    </VStack>
  );
};

export default CreateMessageForm;
