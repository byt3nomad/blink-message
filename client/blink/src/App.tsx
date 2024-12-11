import { Card, Heading, Textarea, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

function App() {
  return (
    <VStack px={4} pt={10}>
      <Card.Root maxW="700px" w="full" size="sm">
        <form>
          <Card.Header>
            <Heading size="md">Message</Heading>
          </Card.Header>
          <Card.Body>
            <Field required>
              <Textarea
                size={"lg"}
                resize="none"
                placeholder="Start typing..."
              />
            </Field>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button type="submit">Create link</Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </VStack>
  );
}

export default App;
