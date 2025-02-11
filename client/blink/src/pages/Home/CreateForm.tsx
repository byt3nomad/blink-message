import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import encryptService from "@/core/encryptService";
import messageService from "@/core/messageService";
import {
  Box,
  Card,
  Collapsible,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import { CreatedMessage } from "./types";

const MAX_CHAR_LIMIT = 5000;

interface CreateFormProps {
  onSuccess: (createdMessage: CreatedMessage) => void;
}

const CreateForm = ({ onSuccess }: CreateFormProps) => {
  const [message, setMessage] = useState("");
  const [destroyAtValue, setDestroyAtValue] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const minDestroyAtValue = new Date().toISOString().slice(0, 16);
  const [submitting, setSubmitting] = useState(false);
  const [invalidDestroyAtValue, setInvalidDestroyAtValue] = useState(false);
  const [viewCount, setViewCount] = useState(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setError(null);

    const destroyAt = new Date(destroyAtValue);

    if (new Date() >= destroyAt) {
      setInvalidDestroyAtValue(true);
      setSubmitting(false);
      return;
    } else setInvalidDestroyAtValue(false);

    const { encryptedMessage, decryptionData } = password
      ? await encryptService.encryptMessageWithPassword(message, password)
      : await encryptService.encryptMessage(message);

    const response = await messageService.createMessage(
      encryptedMessage,
      Boolean(password),
      viewCount,
      destroyAt.getTime()
    );

    if (response.success) {
      onSuccess({ id: response.messageId, decryptionData });
    } else {
      setError(response.error);
    }

    setSubmitting(false);
  };

  return (
    <Box w={"full"}>
      <Card.Root size="sm">
        <Collapsible.Root>
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
              <Collapsible.Content mt={"5"}>
                <Field label="Password">
                  <PasswordInput
                    value={password}
                    minLength={3}
                    maxLength={128}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field
                  mt={"5"}
                  label="Destroy at"
                  invalid={invalidDestroyAtValue}
                  errorText="The destruction date must be later than the current time."
                >
                  <Input
                    type="datetime-local"
                    value={destroyAtValue}
                    min={minDestroyAtValue}
                    onChange={(e) => setDestroyAtValue(e.target.value)}
                  />
                </Field>
                <Field mt={"5"} label="View count">
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={viewCount}
                    onChange={(e) => setViewCount(Number(e.target.value))}
                  />
                </Field>
              </Collapsible.Content>
            </Card.Body>
            <Card.Footer mt={"4"} justifyContent="space-between">
              <Collapsible.Trigger>
                <Button colorPalette={"teal"} variant="outline">
                  <BsShieldLock /> Advanced Options
                </Button>
              </Collapsible.Trigger>
              <Button loading={submitting} type="submit">
                Create link
              </Button>
            </Card.Footer>
          </form>
        </Collapsible.Root>
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
