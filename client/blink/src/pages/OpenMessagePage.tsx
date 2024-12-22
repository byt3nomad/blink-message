import OpenMessage from "@/components/OpenMessage";
import ShowMessageInfo from "@/components/ShowMessageInfo";
import { Show } from "@chakra-ui/react";
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
  );
};

export default OpenMessagePage;
