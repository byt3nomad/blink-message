import { useState } from "react";
import MessageForm, { CreatedMessage } from "../components/MessageForm";

function CreateMessage() {
  const [messageId, setMessageId] = useState<string | null>(null);

  const handleOnSuccess = (encryptedMessage: CreatedMessage) => {};

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
