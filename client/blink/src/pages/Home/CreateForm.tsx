import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import messageService from "@/core/messageService";
import { Box, Card, Heading, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { CreatedMessage } from "./types";
import encryptService from "@/core/encryptService";

const MAX_CHAR_LIMIT = 5000;

interface CreateFormProps {
  onSuccess: (createdMessage: CreatedMessage) => void;
}

const CreateForm = ({ onSuccess }: CreateFormProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setError(null);

    const { encryptedMessage, decryptionKey } =
      await encryptService.encryptMessage(message);
    const response = await messageService.createMessage(encryptedMessage);

    if (response.success) {
      onSuccess({ id: response.messageId, decryptionKey });
    } else {
      setError(response.error);
    }

    setSubmitting(false);
    setMessage("");
  };

  return (
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
  );
};

export default CreateForm;
