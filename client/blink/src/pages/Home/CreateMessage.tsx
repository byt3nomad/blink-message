import { Code, Heading, Image, Show, Text, VStack } from "@chakra-ui/react";
import urlInfoDark from "../../assets/url-dark.svg";
import urlInfoWhite from "../../assets/url-white.svg";
import { useColorMode } from "../../components/ui/color-mode";
import CreateForm from "./CreateForm";
import { CreatedMessage } from "./types";

interface CreateMessageProps {
  onSuccess: (createdMessage: CreatedMessage) => void;
}
const CreateMessage = ({ onSuccess }: CreateMessageProps) => {
  const { colorMode } = useColorMode();

  return (
    <VStack maxW={"750px"} w={"full"} gap={24}>
      <VStack gap={1}>
        <Heading textAlign={"center"} fontFamily={"Montserrat"}>
          Exchange confidential data while ensuring total privacy
        </Heading>
        <Code>client side encryption with AES 256</Code>
      </VStack>
      <CreateForm onSuccess={onSuccess} />
      <VStack gap="2" alignItems="flex-start">
        <Heading as="h2">Message Encryption</Heading>
        <Show
          when={colorMode === "dark"}
          fallback={<Image src={urlInfoWhite} />}
        >
          <Image src={urlInfoDark} />
        </Show>
        <Text as="p">
          To protect your messages, we first use the native crypto.subtle API in
          your browser to generate a secure AES-256 key, which is then used to
          encrypt your message entirely on your device before anything is sent
          to our server. Only the encrypted message is transmitted, while the
          actual key is stored in the URL, ensuring the server itself has no
          access to your decryption key and cannot read the content of your
          message.
        </Text>
      </VStack>
    </VStack>
  );
};

export default CreateMessage;
