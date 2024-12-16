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
import { Card, Em, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { TbMailOpened } from "react-icons/tb";
import { useLocation } from "react-router";

const OpenMessage = () => {
  const [messageId, encryptionKey] = useLocation().hash.slice(1).split("/");
  const [message, setMessage] = useState<MessageInfoResult | null>(null);

  useEffect(() => {
    if (messageId) {
      const fetchMessage = async () => {
        const message = await messageService.getMessageInfo(messageId);
        setMessage(message);
      };

      fetchMessage();
    }
  }, [messageId]);

  if (!messageId) {
    return (
      <Alert maxW="700px" w="full" status="error" title="Message Id Not Found">
        The URL is not specifying a valid <strong>MESSAGE_ID</strong>. Please
        ensure it follows this format:
        <br />
        {"/open#{MESSAGE_ID}/{DECODE_KEY}"}
      </Alert>
    );
  }

  if (!message) {
    return <Spinner size="lg" />;
  }

  if (message?.success === false) {
    return (
      <Alert maxW="700px" w="full" status="error" title="Message not found!">
        {message.error}
      </Alert>
    );
  }

  return (
    <Card.Root size="lg">
      <Card.Header>Message History</Card.Header>
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

          {message.opened && (
            <>
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
            </>
          )}
        </TimelineRoot>
      </Card.Body>
      <Card.Footer justifyContent="center">
        {message.opened ? (
          <Button variant="surface">Close</Button>
        ) : (
          <VStack>
            <Button>Open Message </Button>
            <Text textStyle="sm">
              <Em>This message can be opened only once!</Em>
            </Text>
          </VStack>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default OpenMessage;
