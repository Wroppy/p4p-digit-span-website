import { Badge, Button, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Link, useNavigate } from "react-router";
import { useSettings } from "../context/SettingsContext";
import { type TestSession, createSession } from "../lib/session";
import styles from "./HomePage.module.css";

const STEPS = [
  {
    label: "Watch the digits",
    desc: "A sequence of digits will appear one at a time on screen.",
  },
  {
    label: "Recall the sequence",
    desc: "Enter the digits in the exact order you saw them.",
  },
  {
    label: "Rate your workload",
    desc: "Complete a short NASA TLX questionnaire after the test.",
  },
];

export default function HomePage() {
  const { digitSpan, trialsPerSpan } = useSettings();
  const [session, setSession] = useLocalStorage<TestSession | null>({
    key: "testSession",
    defaultValue: null,
    getInitialValueInEffect: false,
  });
  const navigate = useNavigate();

  function startNewTest() {
    setSession(createSession(trialsPerSpan));
    navigate("/test");
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.eyebrow}>Cognitive Assessment</span>
        <h1 className={styles.title}>Digit Span Task</h1>
        <Text className={styles.description}>
          A short memory test measuring how many digits you can hold in working
          memory. The test runs {trialsPerSpan} trials at each span, followed by
          a workload rating.
        </Text>

        <div className={styles.actions}>
          {!session && (
            <Button onClick={startNewTest} size="lg" fullWidth>
              Start test
            </Button>
          )}
          {session && !session.completedAt && (
            <Button component={Link} to="/test" size="lg" fullWidth>
              Continue test — trial {session.currentTrialIndex + 1} of{" "}
              {session.plannedSpans.length}
            </Button>
          )}
          {session && session.completedAt && (
            <Button component={Link} to="/test" size="lg" fullWidth>
              View results
            </Button>
          )}

          <Button component={Link} to="/practice" variant="light" size="md" fullWidth>
            Practice ({digitSpan} digits)
          </Button>

          {session && (
            <Button onClick={startNewTest} variant="subtle" size="sm">
              Start new test
            </Button>
          )}
          <Button component={Link} to="/settings" variant="transparent" size="sm">
            Change settings
          </Button>
        </div>

        {session && (
          <div className={styles.spanInfo}>
            <Badge variant="light" size="sm" color={session.completedAt ? "green" : "blue"}>
              {session.completedAt ? "Completed" : "In progress"}
            </Badge>
            <Text className={styles.uuid}>{session.uuid}</Text>
          </div>
        )}
      </div>

      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <div key={step.label} className={styles.step}>
            <div className={styles.stepNumber}>{i + 1}</div>
            <span className={styles.stepLabel}>{step.label}</span>
            <span className={styles.stepDesc}>{step.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
