import { Card, Heading, Textarea, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

interface MessageFormProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}

const MessageForm: React.FC<MessageFormProps> = ({
  message,
  onMessageChange,
  onSubmit,
  submitting,
}) => {
  return (
    <VStack px={4} pt={10}>
      <Card.Root maxW="700px" w="full" size="sm">
        <form onSubmit={onSubmit}>
          <Card.Header>
            <Heading size="md">Message</Heading>
          </Card.Header>
          <Card.Body>
            <Field required>
              <Textarea
                size={"lg"}
                resize="none"
                value={message}
                placeholder="Start typing..."
                onChange={(e) => onMessageChange(e.target.value)}
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
    </VStack>
  );
};

export default MessageForm;
