import { Button, Stack, Text, Title } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import styles from "./DigitSpanTask.module.css";

type ResultPhaseProps = {
  correct: boolean;
  sequence: number[];
  response: number[];
  onReset: () => void;
};

export default function ResultPhase({ correct, sequence, response, onReset }: ResultPhaseProps) {
  return (
    <div className={styles.container}>
      <Stack align="center" gap="lg">
        <div className={styles.resultIcon}>
          {correct ? (
            <IconCheck size={72} color="var(--mantine-color-green-6)" />
          ) : (
            <IconX size={72} color="var(--mantine-color-red-6)" />
          )}
        </div>
        <Title order={2}>{correct ? "Correct!" : "Incorrect"}</Title>
        <Stack gap="xs" align="center">
          <Text c="dimmed" size="sm">Correct sequence</Text>
          <div className={styles.digitList}>
            {sequence.map((digit, i) => (
              <div key={i} className={styles.digitChip}>{digit}</div>
            ))}
          </div>
          {!correct && (
            <>
              <Text c="dimmed" size="sm" mt="xs">Your response</Text>
              <div className={styles.digitList}>
                {response.map((digit, i) => (
                  <div
                    key={i}
                    className={`${styles.digitChip} ${digit !== sequence[i] ? styles.digitChipWrong : ""}`}
                  >
                    {digit}
                  </div>
                ))}
              </div>
            </>
          )}
        </Stack>
        <Button onClick={onReset}>Try Again</Button>
      </Stack>
    </div>
  );
}
