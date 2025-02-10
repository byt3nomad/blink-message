import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "@/components/ui/timeline";
import { MessageInfoSuccess } from "@/core/messageService";
import { formatDate } from "@/core/util";
import { For, Show, Text } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { TbMailOpened } from "react-icons/tb";

interface MessageTimelineProps {
  message: MessageInfoSuccess;
}

const MessageTimeline = ({
  message: { createdAt, viewTimestamps, destroyed, destroyedAt },
}: MessageTimelineProps) => {
  return (
    <TimelineRoot maxW="400px">
      <TimelineItem>
        <TimelineConnector>
          <LuCheck />
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle>Message Created</TimelineTitle>
          <TimelineDescription>{formatDate(createdAt)}</TimelineDescription>
          <Text textStyle="sm">
            This message was created on the specified date.
          </Text>
        </TimelineContent>
      </TimelineItem>
      <For each={viewTimestamps}>
        {(timestamp) => (
          <TimelineItem>
            <TimelineConnector>
              <TbMailOpened />
            </TimelineConnector>
            <TimelineContent>
              <TimelineTitle textStyle="sm">Message Viewed</TimelineTitle>
              <TimelineDescription>{formatDate(timestamp)}</TimelineDescription>
              <Text textStyle="sm">
                The recipient has viewed the message content.
              </Text>
            </TimelineContent>
          </TimelineItem>
        )}
      </For>
      <Show when={destroyed}>
        <TimelineItem>
          <TimelineConnector>
            <MdDeleteOutline />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle textStyle="sm">Message Destroyed</TimelineTitle>
            <TimelineDescription>
              {formatDate(destroyedAt || 0)}
            </TimelineDescription>
            <Text textStyle="sm">
              The content of the message have been permanently erased.
            </Text>
          </TimelineContent>
        </TimelineItem>
      </Show>
    </TimelineRoot>
  );
};

export default MessageTimeline;
