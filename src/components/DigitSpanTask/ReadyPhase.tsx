import { Button, Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";
import styles from "./DigitSpanTask.module.css";

type ReadyPhaseProps = {
  span: number;
  onStart: () => void;
  progress?: ReactNode;
  revealSpan?: boolean;
};

export default function ReadyPhase({ span, onStart, progress, revealSpan = true }: ReadyPhaseProps) {
  return (
    <div className={styles.container}>
      <Stack align="center" gap="lg">
        {progress}
        <Title order={2}>Digit Span Task</Title>
        <Text c="dimmed">
          {revealSpan
            ? `You will see ${span} digits, one at a time. When they are done, enter them in the order you saw them.`
            : "Digits will appear one at a time. When they stop, enter them in the order you saw them."}
        </Text>
        <Button size="lg" onClick={onStart}>
          Start
        </Button>
      </Stack>
    </div>
  );
}
