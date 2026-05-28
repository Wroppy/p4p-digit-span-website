import { Button, Stack, Text, Title } from "@mantine/core";
import styles from "./DigitSpanTask.module.css";

type ReadyPhaseProps = {
  span: number;
  onStart: () => void;
};

export default function ReadyPhase({ span, onStart }: ReadyPhaseProps) {
  return (
    <div className={styles.container}>
      <Stack align="center" gap="lg">
        <Title order={2}>Digit Span Task</Title>
        <Text c="dimmed">
          You will see {span} digits, one at a time. When they are done, enter
          them in the order you saw them.
        </Text>
        <Button size="lg" onClick={onStart}>
          Start
        </Button>
      </Stack>
    </div>
  );
}
