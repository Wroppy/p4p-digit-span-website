import { Button, PinInput, Stack, Title } from "@mantine/core";
import type { ReactNode } from "react";
import styles from "./DigitSpanTask.module.css";

type RecallPhaseProps = {
  span: number;
  pinValue: string;
  onChange: (value: string) => void;
  onSubmit: (pin: string) => void;
  progress?: ReactNode;
};

export default function RecallPhase({ span, pinValue, onChange, onSubmit, progress }: RecallPhaseProps) {
  return (
    <div className={styles.container}>
      <Stack align="center" gap="lg">
        {progress}
        <Title order={3}>Enter the digits you saw</Title>
        <PinInput
          length={span}
          type="number"
          size="xl"
          autoFocus
          value={pinValue}
          onChange={onChange}
          onComplete={onSubmit}
        />
        <Button
          size="lg"
          onClick={() => onSubmit(pinValue)}
          disabled={pinValue.length < span}
        >
          Submit
        </Button>
      </Stack>
    </div>
  );
}
