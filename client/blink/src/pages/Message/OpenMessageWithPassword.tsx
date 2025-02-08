interface OpenMessageWithPasswordProps {
  encryptedMessage: string;
  decryptionData: string;
  handleCloseOpenedMessage(): void;
}

const OpenMessageWithPassword = (props: OpenMessageWithPasswordProps) => {
  return <div>OpenMessageWithPassword</div>;
};

export default OpenMessageWithPassword;
