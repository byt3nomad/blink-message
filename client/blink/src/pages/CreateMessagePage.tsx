import CopyMessageUrl from "@/components/CopyMessageUrl";
import { useEffect, useState } from "react";
import CreateMessageForm, {
  CreatedMessage,
} from "../components/CreateMessageForm";
import { useLocation } from "react-router";
import { VStack } from "@chakra-ui/react";

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
        <CreateMessageForm onSuccess={handleOnSuccess} />
      ) : (
        <CopyMessageUrl
          createNewMessageClicked={handleCreateNewMessageClicked}
          encryptionKey={createdMessage.key}
          messageId={createdMessage.id}
        />
      )}
    </VStack>
  );
}

export default CreateMessagePage;
