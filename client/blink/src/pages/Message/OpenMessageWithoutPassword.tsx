import encryptService from "@/core/encryptService";
import { DecryptedMessageResult } from "@/core/types";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Alert } from "../../components/ui/alert";
import MessageCard from "./MessageCard";

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
      setMessage(decryptedMessageResult);
    };
    fetchMessage();
  }, []);

  if (!message) {
    return <Spinner />;
  }

  if (!message.success) {
    return (
      <Alert
        maxW="700px"
        w="full"
        status="error"
        title={message.errorMessage}
      />
    );
  }

  return (
    <>
      <MessageCard
        decryptedMessage={message.decryptedMessage}
        handleCloseOpenedMessage={handleCloseOpenedMessage}
      />
    </>
  );
};

export default OpenMessageWithoutPassword;
