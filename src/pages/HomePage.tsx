import { Badge, Button, Text } from "@mantine/core";
import { Link } from "react-router";
import { useSettings } from "../context/SettingsContext";
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
    desc: "Complete a short NASA TLX questionnaire after each trial.",
  },
];

export default function HomePage() {
  const { digitSpan } = useSettings();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.eyebrow}>Cognitive Assessment</span>
        <h1 className={styles.title}>Digit Span Task</h1>
        <Text className={styles.description}>
          A short memory test measuring how many digits you can hold in working
          memory. Each trial is followed by a workload rating.
        </Text>
        <div className={styles.spanInfo}>
          <Text size="sm" c="dimmed">Sequence length:</Text>
          <Badge variant="light" size="md">{digitSpan} digits</Badge>
        </div>
        <div className={styles.actions}>
          <Button component={Link} to="/digit-span" size="lg" fullWidth>
            Begin
          </Button>
          <Button component={Link} to="/settings" variant="transparent" size="sm">
            Change settings
          </Button>
        </div>
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
