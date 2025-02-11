import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Box, Heading, Link } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

const EncryptionInformation = () => {
  return (
    <Box w={"full"}>
      <Heading>Encryption With Password</Heading>
      <AccordionRoot collapsible defaultValue={["genKey"]}>
        <AccordionItem value={"genKey"}>
          <AccordionItemTrigger>Generate key</AccordionItemTrigger>
          <AccordionItemContent>
            We begin by generating a secure 256-bit AES encryption key.
            <br />
            <Link
              target="_blank"
              variant={"underline"}
              colorPalette="teal"
              href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#aes_key_generation"
            >
              MDN Docs: AES Key Generation
              <LuExternalLink />
            </Link>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value={"encMes"}>
          <AccordionItemTrigger>Encrypt Message</AccordionItemTrigger>
          <AccordionItemContent>
            Next, we encrypt your message using the AES key generated earlier.
            <br />
            <Link
              target="_blank"
              variant={"underline"}
              colorPalette="teal"
              href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm_2"
            >
              MDN Docs: AES-GCM Encryption
              <LuExternalLink />
            </Link>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value={"derive"}>
          <AccordionItemTrigger>Derive Key from Password</AccordionItemTrigger>
          <AccordionItemContent>
            Then, we derive a 256-bit AES key from your password. This key will
            be used to secure your message encryption key .
            <br />
            <Link
              target="_blank"
              variant={"underline"}
              colorPalette="teal"
              href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#pbkdf2_derive_aes_key_from_password"
            >
              MDN Docs: Derive AES Key from Password
              <LuExternalLink />
            </Link>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value={"encryptKey"}>
          <AccordionItemTrigger>Encrypt the Message Key</AccordionItemTrigger>
          <AccordionItemContent>
            We then use the key derived from your password to encrypt the
            original AES key that secured your message. Only someone with the
            correct password can later decrypt this key.
            <br />
            <Link
              target="_blank"
              variant={"underline"}
              colorPalette="teal"
              href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm_2"
            >
              MDN Docs: AES-GCM Encryption
              <LuExternalLink />
            </Link>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value={"url"}>
          <AccordionItemTrigger>
            Embed Decryption Data in the URL
          </AccordionItemTrigger>
          <AccordionItemContent>
            Finally, we bundle the encrypted message key along with its
            initialization vector (IV) and salt into a single byte array. This
            array is then encoded in Base64 and appended to the URL.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value={"decryptionMes"}>
          <AccordionItemTrigger>Decrypt Message</AccordionItemTrigger>
          <AccordionItemContent>
            Since only the encrypted version of the message key is stored in the
            URL, the user must first enter the correct password. This password
            is used to derive a decryption key that unlocks the encrypted
            message key, which in turn decrypts your message.
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </Box>
  );
};

export default EncryptionInformation;
