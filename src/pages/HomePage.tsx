import { Badge, Button, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import { useSettings } from "../context/SettingsContext";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { digitSpan } = useSettings();

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Title order={1}>Digit Span Assessment</Title>
        <Text className={styles.description}>
          You will be shown a sequence of digits and asked to recall them in
          order. After each trial, you will complete a short NASA TLX workload
          rating.
        </Text>
        <div className={styles.spanInfo}>
          <Text size="sm" c="dimmed">Current span:</Text>
          <Badge variant="light" size="md">{digitSpan} digits</Badge>
        </div>
        <div className={styles.actions}>
          <Button component={Link} to="/task" size="lg" fullWidth>
            Start
          </Button>
          <Button component={Link} to="/settings" variant="transparent" size="sm">
            Change settings
          </Button>
        </div>
      </div>
    </div>
  );
}
