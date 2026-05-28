import { Button, Divider, NumberInput, Paper, Slider, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import styles from "./TlxForm.module.css";

export type TlxKey =
  | "mentalDemand"
  | "physicalDemand"
  | "temporalDemand"
  | "performance"
  | "effort"
  | "frustration";

export type TlxValues = Record<TlxKey, number | null>;

type TlxFormProps = {
  onSubmit: (values: TlxValues) => void;
}

const SUBSCALES: {
  key: TlxKey;
  label: string;
  question: string;
  low: string;
  high: string;
}[] = [
  {
    key: "mentalDemand",
    label: "Mental Demand",
    question:
      "How much mental and perceptual activity was required? Was the task easy or demanding, simple or complex, exacting or forgiving?",
    low: "Very Low",
    high: "Very High",
  },
  {
    key: "physicalDemand",
    label: "Physical Demand",
    question:
      "How much physical activity was required? Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?",
    low: "Very Low",
    high: "Very High",
  },
  {
    key: "temporalDemand",
    label: "Temporal Demand",
    question:
      "How much time pressure did you feel due to the rate or pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?",
    low: "Very Low",
    high: "Very High",
  },
  {
    key: "performance",
    label: "Performance",
    question:
      "How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)?",
    low: "Good",
    high: "Poor",
  },
  {
    key: "effort",
    label: "Effort",
    question:
      "How hard did you have to work (mentally and physically) to accomplish your level of performance?",
    low: "Very Low",
    high: "Very High",
  },
  {
    key: "frustration",
    label: "Frustration",
    question:
      "How insecure, discouraged, irritated, stressed, and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?",
    low: "Very Low",
    high: "Very High",
  },
];

const INITIAL: TlxValues = {
  mentalDemand: null,
  physicalDemand: null,
  temporalDemand: null,
  performance: null,
  effort: null,
  frustration: null,
};

const MARKS = Array.from({ length: 11 }, (_, i) => ({ value: i * 10, label: String(i * 10) }));

export default function TlxForm({ onSubmit }: TlxFormProps) {
  const [values, setValues] = useState<TlxValues>(INITIAL);

  const allRated = Object.values(values).every((v) => v !== null);

  function handleChange(key: TlxKey, value: number | null) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    onSubmit(values as TlxValues);
  }

  return (
    <Paper withBorder shadow="xs" p="xl" radius="md" className={styles.card}>
      <form action={handleSubmit}>
        <Stack gap="lg">
          <div>
            <Title order={2}>NASA Task Load Index</Title>
            <Text className={styles.hint} mt="xs">
              Rate your experience on each dimension below. Move each slider to
              the position that best represents your workload during the task.
            </Text>
          </div>
          <Divider />
          <Stack gap="xl">
            {SUBSCALES.map(({ key, label, question, low, high }) => (
              <Stack key={key} gap="xs">
                <Text fw={500}>{label}</Text>
                <Text className={styles.hint}>{question}</Text>
                <div className={styles.sliderWrapper}>
                  <div className={styles.sliderRow}>
                    <span className={styles.anchor}>{low}</span>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={values[key] ?? undefined}
                      onChange={(v) => handleChange(key, v)}
                      label={(v) => v}
                      marks={MARKS}
                    />
                    <span className={styles.anchor}>{high}</span>
                  </div>
                  <NumberInput
                    min={0}
                    max={100}
                    step={1}
                    value={values[key] ?? ""}
                    onChange={(v) => handleChange(key, typeof v === "number" ? v : null)}
                    size="xs"
                    hideControls
                    w={56}
                  />
                </div>
              </Stack>
            ))}
          </Stack>
          <Divider mt="xl" />
          <Button type="submit" fullWidth disabled={!allRated}>
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
