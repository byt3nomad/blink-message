import { Alert } from "@/components/ui/alert";
import { useLocation } from "react-router";

const OpenMessage = () => {
  const [messageId, encryptionKey] = useLocation().hash.slice(1).split("/");
  if (!messageId || !encryptionKey) {
    return (
      <Alert maxW="700px" w="full" status="error" title="Invalid URL Format">
        The URL is not in the correct format. Please ensure it follows this
        format:
        <br />
        {"/open#{MESSAGE_ID}/{DECODE_KEY}"}
      </Alert>
    );
  }

  return (
    <div>
      MessageId
      <br />
      {messageId}
      <br />
      Key
      <br />
      {encryptionKey}
    </div>
  );
};

export default OpenMessage;
