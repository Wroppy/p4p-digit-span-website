import { AppShell, Group, Title } from "@mantine/core";
import { Link } from "react-router";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <AppShell.Header>
      <Group justify="space-between" className={styles.inner}>
        <Title order={4}>Digit Span Assessment</Title>
        <div className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/settings" className={styles.navLink}>Settings</Link>
        </div>
      </Group>
    </AppShell.Header>
  );
}
