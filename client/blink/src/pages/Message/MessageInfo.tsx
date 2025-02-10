import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import messageService, { MessageInfoResult } from "@/core/messageService";
import { Card, Heading, HStack, Show, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { NavLink } from "react-router";
import ConfigurationTable from "./ConfigurationTable";
import MessageTimeline from "./MessageTimeline";

interface MessageInfoProps {
  messageId: string;
  handelOpenMessage(): void;
}

const MessageInfo = ({ messageId, handelOpenMessage }: MessageInfoProps) => {
  const [message, setMessage] = useState<MessageInfoResult | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const message = await messageService.getMessageInfo(messageId);
      setMessage(message);
    };

    fetchMessage();
  }, [messageId]);

  if (!message) {
    return <Spinner size="lg" />;
  }

  if (message?.success === false) {
    return <Alert maxW="700px" w="full" status="error" title={message.error} />;
  }

  return (
    <Card.Root>
      <Card.Header>
        <Heading>Configuration</Heading>
        <ConfigurationTable message={message} />
        <HStack mt={"2"} justifyContent={"flex-end"}>
          <Show
            when={message.destroyed}
            fallback={
              <Button onClick={handelOpenMessage}>Open Message </Button>
            }
          >
            <NavLink to={"/"}>
              <Button variant={"outline"}>
                <TbRefresh /> Create new message
              </Button>
            </NavLink>
          </Show>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Heading mb={4}>Timeline</Heading>
        <MessageTimeline message={message} />
      </Card.Body>
    </Card.Root>
  );
};

export default MessageInfo;
