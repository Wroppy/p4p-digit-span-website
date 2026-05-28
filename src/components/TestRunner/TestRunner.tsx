import { Progress, Stack, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { useSettings } from "../../context/SettingsContext";
import dayjs from "../../lib/dayjs";
import { type TestSession, createSession, type TrialRecord } from "../../lib/session";
import DigitSpanTask, { type DigitSpanResult } from "../DigitSpanTask/DigitSpanTask";
import TlxForm, { type TlxValues } from "../TlxForm/TlxForm";
import styles from "./TestRunner.module.css";

export default function TestRunner() {
  const { trialsPerSpan } = useSettings();
  const [session, setSession] = useLocalStorage<TestSession | null>({
    key: "testSession",
    defaultValue: null,
    getInitialValueInEffect: false,
  });

  useEffect(() => {
    if (session === null) setSession(createSession(trialsPerSpan));
  }, [session, trialsPerSpan, setSession]);

  if (!session) return null;

  const total = session.plannedSpans.length;

  function handleTrialComplete(result: DigitSpanResult) {
    setSession((prev) => {
      if (!prev) return prev;
      const trial: TrialRecord = {
        index: prev.currentTrialIndex,
        span: result.span,
        sequence: result.sequence,
        digits: result.digits,
        startedAt: result.startedAt,
        response: result.response,
        submittedAt: result.submittedAt,
        correct: result.correct,
      };
      return {
        ...prev,
        trials: [...prev.trials, trial],
        currentTrialIndex: prev.currentTrialIndex + 1,
      };
    });
  }

  function handleTlxSubmit(values: TlxValues) {
    setSession((prev) =>
      prev ? { ...prev, tlx: values, completedAt: dayjs().toISOString() } : prev,
    );
  }

  // Results phase (placeholder until chunk 5).
  if (session.completedAt) {
    console.log("Test session complete:", session);
    return (
      <div className={styles.page}>
        <Stack align="center" gap="md">
          <Title order={2}>Test complete</Title>
          <Text c="dimmed">Results and download coming next.</Text>
        </Stack>
      </div>
    );
  }

  // TLX phase.
  if (session.currentTrialIndex >= total) {
    return (
      <div className={styles.page}>
        <TlxForm onSubmit={handleTlxSubmit} />
      </div>
    );
  }

  // Running phase.
  const progress = (
    <Stack gap={4} align="center" w="100%" maw={320}>
      <Text size="sm" c="dimmed">
        Trial {session.currentTrialIndex + 1} of {total}
      </Text>
      <Progress value={(session.currentTrialIndex / total) * 100} w="100%" />
    </Stack>
  );

  return (
    <DigitSpanTask
      key={session.currentTrialIndex}
      span={session.plannedSpans[session.currentTrialIndex]}
      showFeedback={false}
      onComplete={handleTrialComplete}
      progress={progress}
    />
  );
}
