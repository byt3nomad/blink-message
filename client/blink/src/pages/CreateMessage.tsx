import { useState } from "react";
import MessageForm from "../components/MessageForm";

function CreateMessage() {
  const [messageId, setMessageId] = useState<string | null>(null);

  const handleOnSuccess = (messageId: string) => {
    setMessageId(messageId);
  };

  return (
    <>
      {!messageId ? (
        <MessageForm onSuccess={handleOnSuccess} />
      ) : (
        <>{messageId}</>
      )}
    </>
  );
}

export default CreateMessage;
