import OpenMessage from "@/components/OpenMessage";
import ShowMessageInfo from "@/components/ShowMessageInfo";
import { Show } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router";

const OpenMessagePage = () => {
  let { messageId = "" } = useParams();
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseOpenedMessage = () => {
    setOpenMessage(false);
    console.log("asd");
  };

  return (
    <Show
      when={openMessage}
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
