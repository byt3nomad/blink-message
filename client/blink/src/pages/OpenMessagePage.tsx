import MessageInfo from "@/components/MessageInfo";
import { useParams } from "react-router";

const OpenMessagePage = () => {
  let { messageId = "" } = useParams();
  return <MessageInfo messageId={messageId} />;
};

export default OpenMessagePage;
