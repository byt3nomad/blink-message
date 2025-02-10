import { useColorMode } from "@/components/ui/color-mode";
import { MessageInfoSuccess } from "@/core/messageService";
import { formatDate } from "@/core/util";
import { Show, Table } from "@chakra-ui/react";

interface ConfigurationTableProps {
  message: MessageInfoSuccess;
}

const ConfigurationTable = ({
  message: {
    configuration: { encryptedWithPassword, destroyAt, viewCount },
    viewTimestamps,
  },
}: ConfigurationTableProps) => {
  const { colorMode } = useColorMode();

  return (
    <Table.Root size="sm" showColumnBorder>
      <Table.Body>
        <Table.Row
          backgroundColor={colorMode === "dark" ? "#111111" : "#ffffff"}
          key={1}
        >
          <Table.Cell>Password</Table.Cell>
          <Table.Cell>
            {encryptedWithPassword ? "Enabled" : "Disabled"}
          </Table.Cell>
        </Table.Row>
        <Table.Row
          backgroundColor={colorMode === "dark" ? "#111111" : "#ffffff"}
          key={2}
        >
          <Table.Cell>Views</Table.Cell>
          <Table.Cell>
            {`Viewed ${viewTimestamps.length} out of ${viewCount} times.`}
          </Table.Cell>
        </Table.Row>
        <Table.Row
          backgroundColor={colorMode === "dark" ? "#111111" : "#ffffff"}
          key={3}
        >
          <Table.Cell>Destruction</Table.Cell>
          <Table.Cell>
            <Show when={destroyAt} fallback="Never">
              {`${formatDate(destroyAt || 0)}`}
            </Show>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default ConfigurationTable;
