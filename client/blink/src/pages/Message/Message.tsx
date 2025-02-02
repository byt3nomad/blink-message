import OpenMessage from "@/pages/Message/OpenMessage";
import MessageInfo from "@/pages/Message/MessageInfo";
import { Show, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router";

const Message = () => {
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
          <MessageInfo
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

export default Message;
