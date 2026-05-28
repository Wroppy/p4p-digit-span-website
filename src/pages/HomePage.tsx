import { Badge, Button, Container, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import { useSettings } from "../context/SettingsContext";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { digitSpan } = useSettings();

  return (
    <Container size="sm" className={styles.container}>
      <Stack gap="lg">
        <Title>Digit Span + NASA TLX Assessment</Title>
        <Text className={styles.description}>
          You will be shown a sequence of digits and asked to recall them in
          order. After each trial, you will complete a short NASA TLX workload
          rating.
        </Text>
        <Text>
          Current digit span:{" "}
          <Badge size="lg" variant="light">
            {digitSpan} digits
          </Badge>
        </Text>
        <Button component={Link} to="/task" size="lg">
          Start
        </Button>
        <Button component={Link} to="/settings" variant="subtle" size="sm">
          Settings
        </Button>
      </Stack>
    </Container>
  );
}
