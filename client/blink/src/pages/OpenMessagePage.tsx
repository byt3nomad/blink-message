import OpenMessage from "@/components/OpenMessage";
import ShowMessageInfo from "@/components/ShowMessageInfo";
import { useState } from "react";
import { useParams } from "react-router";

const OpenMessagePage = () => {
  let { messageId = "" } = useParams();
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenMessageClick = () => {
    setOpenMessage(true);
  };
  return (
    <>
      {/* {openMessage ? (
        <OpenMessage messageId={messageId} />
      ) : (
        <ShowMessageInfo
          messageId={messageId}
          handelOpenMessageClick={handleOpenMessageClick}
        />
      )} */}
      <OpenMessage messageId={messageId} />
    </>
  );
};

export default OpenMessagePage;
