import { Badge, Button, Divider, Group, Paper, Stack, Table, Text, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { Link } from "react-router";
import { downloadJson } from "../../lib/download";
import { SPANS, type TestSession } from "../../lib/session";
import type { TlxKey } from "../TlxForm/TlxForm";
import styles from "./TestResults.module.css";

const TLX_LABELS: Record<TlxKey, string> = {
  mentalDemand: "Mental Demand",
  physicalDemand: "Physical Demand",
  temporalDemand: "Temporal Demand",
  performance: "Performance",
  effort: "Effort",
  frustration: "Frustration",
};

type TestResultsProps = {
  session: TestSession;
  onRestart: () => void;
};

export default function TestResults({ session, onRestart }: TestResultsProps) {
  const totalCorrect = session.trials.filter((t) => t.correct).length;
  const total = session.trials.length;

  const perSpan = SPANS.map((span) => {
    const trials = session.trials.filter((t) => t.span === span);
    return {
      span,
      correct: trials.filter((t) => t.correct).length,
      total: trials.length,
    };
  });

  function handleDownload() {
    downloadJson(session, `digit-span-${session.uuid}.json`);
  }

  return (
    <Paper withBorder shadow="xs" p="xl" radius="md" className={styles.card}>
      <Stack gap="lg">
        <div>
          <Title order={2}>Test complete</Title>
          <Text className={styles.uuid}>ID: {session.uuid}</Text>
        </div>

        <Group justify="center" gap="xs">
          <Text className={styles.score}>{totalCorrect}</Text>
          <Text c="dimmed" className={styles.scoreTotal}>/ {total} correct</Text>
        </Group>

        <Divider label="By span" labelPosition="center" />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Span</Table.Th>
              <Table.Th>Correct</Table.Th>
              <Table.Th>Accuracy</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {perSpan.map(({ span, correct, total }) => (
              <Table.Tr key={span}>
                <Table.Td>{span} digits</Table.Td>
                <Table.Td>{correct} / {total}</Table.Td>
                <Table.Td>{total ? Math.round((correct / total) * 100) : 0}%</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {session.tlx && (
          <>
            <Divider label="NASA TLX" labelPosition="center" />
            <Stack gap="xs">
              {(Object.keys(TLX_LABELS) as TlxKey[]).map((key) => (
                <Group key={key} justify="space-between">
                  <Text size="sm">{TLX_LABELS[key]}</Text>
                  <Badge variant="light">{session.tlx?.[key] ?? "—"}</Badge>
                </Group>
              ))}
            </Stack>
          </>
        )}

        <Divider />
        <Button leftSection={<IconDownload size={18} />} onClick={handleDownload} fullWidth>
          Download data (JSON)
        </Button>
        <Group justify="space-between">
          <Button variant="default" onClick={onRestart}>
            Start new test
          </Button>
          <Button component={Link} to="/" variant="subtle">
            Home
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
