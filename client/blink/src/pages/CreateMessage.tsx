import { useState } from "react";
import axios from "axios";
import MessageForm from "../components/MessageForm";

function CreateMessage() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [responseId, setResponseId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/messages`;
    try {
      const response = await axios.post(url, {
        content: message,
      });

      if (response.data && response.data.id) {
        setResponseId(response.data.id);
      }
    } catch (e) {
      console.log(e);
    }

    setSubmitting(false);
    setMessage("");
  };

  return (
    <>
      {!responseId ? (
        <MessageForm
          message={message}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      ) : (
        <>{responseId}</>
      )}
    </>
  );
}

export default CreateMessage;
