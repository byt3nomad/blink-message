import messageService, { MessageOpenResult } from "@/core/messageService";
import { Show, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Alert } from "../../components/ui/alert";
import OpenMessageWithPassword from "./OpenMessageWithPassword";
import OpenMessageWithoutPassword from "./OpenMessageWithoutPassword";

interface OpenMessageProps {
  messageId: string;
  handleCloseOpenedMessage(): void;
}

const OpenMessage = ({
  messageId,
  handleCloseOpenedMessage,
}: OpenMessageProps) => {
  const decryptionData = useLocation().hash.slice(1);
  const [messageResult, setMessageResult] = useState<MessageOpenResult | null>(
    null
  );

  useEffect(() => {
    const fetchMessage = async () => {
      const messageOpenedResult = await messageService.getMessageContent(
        messageId
      );
      setMessageResult(messageOpenedResult);
    };
    fetchMessage();
  }, [messageId]);

  if (!messageResult) {
    return <Spinner />;
  }

  if (!messageResult.success) {
    return (
      <Alert maxW="700px" w="full" status="error" title={messageResult.error} />
    );
  }
  return (
    <>
      <Show
        when={messageResult.encryptedWithPassword}
        fallback={
          <OpenMessageWithoutPassword
            decryptionData={decryptionData}
            encryptedMessage={messageResult.encryptedMessage}
            handleCloseOpenedMessage={handleCloseOpenedMessage}
          />
        }
      >
        <OpenMessageWithPassword
          decryptionData={decryptionData}
          encryptedMessage={messageResult.encryptedMessage}
          handleCloseOpenedMessage={handleCloseOpenedMessage}
        />
      </Show>
    </>
  );
};

export default OpenMessage;
