import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CopyMessage from "./CopyMessage";
import CreateMessage from "./CreateMessage";
import { CreatedMessage } from "./types";

function CreateMessagePage() {
  const [createdMessage, setCreatedMessage] = useState<CreatedMessage | null>(
    null
  );
  const location = useLocation();

  // Clears the state if homepage button is pressed when you are on homepage.
  useEffect(() => {
    if (location.state?.reset) {
      setCreatedMessage(null);
    }
  }, [location.state]);

  const handleOnSuccess = (createdMessage: CreatedMessage) => {
    setCreatedMessage(createdMessage);
  };
  const handleCreateNewMessageClicked = () => {
    setCreatedMessage(null);
  };

  return (
    <VStack px={4} py={10}>
      {!createdMessage ? (
        <CreateMessage onSuccess={handleOnSuccess} />
      ) : (
        <CopyMessage
          createNewMessageClicked={handleCreateNewMessageClicked}
          decryptionData={createdMessage.decryptionData}
          messageId={createdMessage.id}
        />
      )}
    </VStack>
  );
}

export default CreateMessagePage;
