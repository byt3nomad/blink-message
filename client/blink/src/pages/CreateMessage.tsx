import { useState } from "react";
import CreateMessageForm, {
  CreatedMessage,
} from "../components/CreateMessageForm";
import CopyMessageUrl from "@/components/CopyMessageUrl";

function CreateMessage() {
  const [createdMessage, setCreatedMessage] = useState<CreatedMessage | null>(
    null
  );

  const handleOnSuccess = (createdMessage: CreatedMessage) => {
    setCreatedMessage(createdMessage);
  };

  return (
    <>
      {!createdMessage ? (
        <CreateMessageForm onSuccess={handleOnSuccess} />
      ) : (
        <CopyMessageUrl
          encryptionKey={"0LCavKbaMwpBbRUQ-YyA1o1zPcQtccSueGURlzVDF2Q"}
          messageId={"jDFXG1pu2qVZULuJz-vIL"}
        />
      )}
    </>
  );
}

export default CreateMessage;
