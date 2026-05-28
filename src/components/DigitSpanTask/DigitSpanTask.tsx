import { Button, PinInput, Stack, Text, Title } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styles from "./DigitSpanTask.module.css";

export type DigitSpanResult = {
  sequence: number[];
  response: number[];
  correct: boolean;
};

type DigitSpanTaskProps = {
  span: number;
  onComplete: (result: DigitSpanResult) => void;
};

type Phase = "ready" | "presenting" | "recall" | "result";

const DIGIT_DURATION = 1600;
const BLANK_DURATION = 400;

function generateSequence(span: number): number[] {
  return Array.from({ length: span }, () => Math.floor(Math.random() * 10));
}

export default function DigitSpanTask({ span, onComplete }: DigitSpanTaskProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showing, setShowing] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [response, setResponse] = useState<number[]>([]);
  const [correct, setCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (phase !== "presenting") return;

    let id: ReturnType<typeof setTimeout>;

    if (showing) {
      id = setTimeout(() => setShowing(false), DIGIT_DURATION);
    } else if (currentIndex < sequence.length - 1) {
      id = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setShowing(true);
      }, BLANK_DURATION);
    } else {
      id = setTimeout(() => setPhase("recall"), BLANK_DURATION);
    }

    return () => clearTimeout(id);
  }, [phase, showing, currentIndex, sequence.length]);

  function handleStart() {
    const seq = generateSequence(span);
    setSequence(seq);
    setCurrentIndex(0);
    setShowing(true);
    setPinValue("");
    setResponse([]);
    setCorrect(null);
    setPhase("presenting");
  }

  function handleSubmit(pin = pinValue) {
    const parsed = pin.split("").map(Number);
    const isCorrect = parsed.every((d, i) => d === sequence[i]) && parsed.length === sequence.length;
    setResponse(parsed);
    setCorrect(isCorrect);
    setPhase("result");
    onComplete({ sequence, response: parsed, correct: isCorrect });
  }

  function handleReset() {
    setPhase("ready");
    setPinValue("");
    setResponse([]);
    setCorrect(null);
  }

  if (phase === "ready") {
    return (
      <div className={styles.container}>
        <Stack align="center" gap="lg">
          <Title order={2}>Digit Span Task</Title>
          <Text c="dimmed">
            You will see {span} digits, one at a time. When they are done,
            enter them in the order you saw them.
          </Text>
          <Button size="lg" onClick={handleStart}>
            Start
          </Button>
        </Stack>
      </div>
    );
  }

  if (phase === "presenting") {
    return (
      <div className={styles.container}>
        {showing ? (
          <div className={styles.digitDisplay}>{sequence[currentIndex]}</div>
        ) : (
          <div className={styles.blank} />
        )}
      </div>
    );
  }

  if (phase === "recall") {
    return (
      <div className={styles.container}>
        <Stack align="center" gap="lg">
          <Title order={3}>Enter the digits you saw</Title>
          <PinInput
            length={span}
            type="number"
            size="xl"
            autoFocus
            value={pinValue}
            onChange={setPinValue}
            onComplete={handleSubmit}
          />
          <Button
            size="lg"
            onClick={() => handleSubmit()}
            disabled={pinValue.length < span}
          >
            Submit
          </Button>
        </Stack>
      </div>
    );
  }

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
        <Button onClick={handleReset}>Try Again</Button>
      </Stack>
    </div>
  );
}
