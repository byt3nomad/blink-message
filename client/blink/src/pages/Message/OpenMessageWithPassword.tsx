import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Toaster, toaster } from "@/components/ui/toaster";
import encryptService from "@/core/encryptService";
import { DecryptedMessageResult, ErrorType } from "@/core/types";
import { Button, Card, Heading } from "@chakra-ui/react";
import { useState } from "react";
import MessageCard from "./MessageCard";

interface OpenMessageWithPasswordProps {
  encryptedMessage: string;
  decryptionData: string;
  handleCloseOpenedMessage(): void;
}

const OpenMessageWithPassword = ({
  handleCloseOpenedMessage,
  decryptionData,
  encryptedMessage,
}: OpenMessageWithPasswordProps) => {
  const [password, setPassword] = useState("");
  const [decryptedMessage, setDecryptedMessage] =
    useState<DecryptedMessageResult | null>(null);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleDecrypt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await encryptService.decryptMessageWithPassword(
      encryptedMessage,
      decryptionData,
      password
    );

    const invalid =
      result.success == false && result.errorType === ErrorType.InvalidPassword;

    if (invalid) {
      toaster.create({
        title: `Incorrect password`,
        type: "error",
      });
      setInvalidPassword(true);
    }

    setDecryptedMessage(result);
  };

  if (decryptedMessage?.success === true) {
    return (
      <MessageCard
        decryptedMessage={decryptedMessage.decryptedMessage}
        handleCloseOpenedMessage={handleCloseOpenedMessage}
      />
    );
  }

  return (
    <>
      <Heading textAlign={"center"}>Message encrypted with password</Heading>
      <Card.Root maxW="700px" w="full" size="sm">
        <form onSubmit={handleDecrypt}>
          <Card.Header>
            <Heading mb={5}>Decrypt message with password</Heading>
            <Field
              label="Password"
              invalid={invalidPassword}
              errorText="Invalid password"
            >
              <PasswordInput
                required
                minLength={3}
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </Card.Header>
          <Card.Body></Card.Body>
          <Card.Footer justifyContent={"flex-end"}>
            <Button variant={"ghost"} onClick={handleCloseOpenedMessage}>
              Close
            </Button>
            <Button type="submit">Decrypt</Button>
          </Card.Footer>
        </form>
      </Card.Root>
      <Toaster />
    </>
  );
};

export default OpenMessageWithPassword;
