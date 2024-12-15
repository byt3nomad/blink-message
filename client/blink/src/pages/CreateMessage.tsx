import CopyMessageUrl from "@/components/CopyMessageUrl";
import { useState } from "react";
import CreateMessageForm, {
  CreatedMessage,
} from "../components/CreateMessageForm";

function CreateMessage() {
  const [createdMessage, setCreatedMessage] = useState<CreatedMessage | null>(
    null
  );

  const handleOnSuccess = (createdMessage: CreatedMessage) => {
    setCreatedMessage(createdMessage);
  };
  const handleCreateNewMessageClicked = () => {
    setCreatedMessage(null);
  };

  return (
    <>
      {!createdMessage ? (
        <CreateMessageForm onSuccess={handleOnSuccess} />
      ) : (
        <CopyMessageUrl
          createNewMessageClicked={handleCreateNewMessageClicked}
          encryptionKey={createdMessage.key}
          messageId={createdMessage.id}
        />
      )}
    </>
  );
}

export default CreateMessage;
