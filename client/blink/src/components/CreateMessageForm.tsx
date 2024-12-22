import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import cryptoService from "@/core/cryptoService";
import messageService from "@/core/messageService";
import { Card, Heading, Textarea } from "@chakra-ui/react";
import { useState } from "react";

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
    <>
      <Card.Root maxW="700px" w="full" size="sm">
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
          maxW="700px"
          w="full"
          status="error"
          title={`There was an error processing your request: ${error}`}
        />
      )}
    </>
  );
};

export default CreateMessageForm;
