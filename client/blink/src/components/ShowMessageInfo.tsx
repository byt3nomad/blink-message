import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "@/components/ui/timeline";
import messageService, { MessageInfoResult } from "@/core/messageService";
import { formatDate } from "@/core/util";
import { Card, Heading, Show, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { TbMailOpened, TbRefresh } from "react-icons/tb";
import { NavLink } from "react-router";

interface ShowMessageInfoProps {
  messageId: string;
  handelOpenMessage(): void;
}

const ShowMessageInfo = ({
  messageId,
  handelOpenMessage,
}: ShowMessageInfoProps) => {
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
        <Heading> Message History</Heading>
      </Card.Header>
      <Card.Body>
        <TimelineRoot maxW="400px">
          <TimelineItem>
            <TimelineConnector>
              <LuCheck />
            </TimelineConnector>
            <TimelineContent>
              <TimelineTitle>Message Created</TimelineTitle>
              <TimelineDescription>
                {formatDate(message.createdAt)}
              </TimelineDescription>
              <Text textStyle="sm">
                This message was created on the specified date.
              </Text>
            </TimelineContent>
          </TimelineItem>

          <Show when={message.opened}>
            <TimelineItem>
              <TimelineConnector>
                <TbMailOpened />
              </TimelineConnector>
              <TimelineContent>
                <TimelineTitle textStyle="sm">Message Opened</TimelineTitle>
                <TimelineDescription>
                  {formatDate(message.openedAt || 0)}
                </TimelineDescription>
                <Text textStyle="sm">
                  The recipient has viewed the message content.
                </Text>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineConnector>
                <MdDeleteOutline />
              </TimelineConnector>
              <TimelineContent>
                <TimelineTitle textStyle="sm">Message Deleted</TimelineTitle>
                <TimelineDescription>
                  {formatDate(message.openedAt || 0)}
                </TimelineDescription>
                <Text textStyle="sm">
                  The content of the message have been permanently erased.
                </Text>
              </TimelineContent>
            </TimelineItem>
          </Show>
        </TimelineRoot>
      </Card.Body>
      <Card.Footer justifyContent={"flex-end"}>
        <Show
          when={message.opened}
          fallback={<Button onClick={handelOpenMessage}>Open Message </Button>}
        >
          <NavLink to={"/"}>
            <Button variant={"outline"}>
              <TbRefresh /> Create new message
            </Button>
          </NavLink>
        </Show>
      </Card.Footer>
    </Card.Root>
  );
};

export default ShowMessageInfo;
