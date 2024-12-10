import { Card, Heading, Textarea, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <VStack px={4} pt={10}>
      <Card.Root maxW="700px" w="full" size="sm">
        <Card.Header>
          <Heading size="md">Message</Heading>
        </Card.Header>
        <Card.Body>
          <Textarea size={"lg"} resize="none" placeholder="Start typing..." />
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button>Create link</Button>
        </Card.Footer>
      </Card.Root>
    </VStack>
  );
}

export default App;
