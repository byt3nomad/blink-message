import OpenMessage from "@/components/OpenMessage";
import ShowMessageInfo from "@/components/ShowMessageInfo";
import { Show, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router";

const OpenMessagePage = () => {
  let { messageId = "" } = useParams();
  const [messageOpened, setMessageOpened] = useState(false);

  const handleOpenMessage = () => {
    setMessageOpened(true);
  };
  const handleCloseOpenedMessage = () => {
    setMessageOpened(false);
  };

  return (
    <VStack px={4} py={10} gap={12}>
      <Show
        when={messageOpened}
        fallback={
          <ShowMessageInfo
            messageId={messageId}
            handelOpenMessage={handleOpenMessage}
          />
        }
      >
        <OpenMessage
          handleCloseOpenedMessage={handleCloseOpenedMessage}
          messageId={messageId}
        />
      </Show>
    </VStack>
  );
};

export default OpenMessagePage;
