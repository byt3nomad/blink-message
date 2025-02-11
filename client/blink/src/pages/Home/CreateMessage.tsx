import { Code, Heading, VStack } from "@chakra-ui/react";
import CreateForm from "./CreateForm";
import EncryptionInformation from "./EncryptionInformation";
import { CreatedMessage } from "./types";

interface CreateMessageProps {
  onSuccess: (createdMessage: CreatedMessage) => void;
}
const CreateMessage = ({ onSuccess }: CreateMessageProps) => {
  return (
    <VStack maxW={"750px"} w={"full"} gap={24}>
      <VStack gap={1}>
        <Heading textAlign={"center"} fontFamily={"Montserrat"}>
          Exchange confidential data while ensuring total privacy
        </Heading>
        <Code>client side encryption with AES 256</Code>
      </VStack>
      <CreateForm onSuccess={onSuccess} />
      <EncryptionInformation />
    </VStack>
  );
};

export default CreateMessage;
