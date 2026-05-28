import { AppShell, Group, Title } from "@mantine/core";
import { Link } from "react-router";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <AppShell.Header>
      <Group justify="space-between" className={styles.inner}>
        <Link to="/" className={styles.homeLink}>
          <Title order={4}>Digit Span Assessment</Title>
        </Link>
        <div className={styles.nav}>
          <Link to="/settings" className={styles.navLink}>Settings</Link>
        </div>
      </Group>
    </AppShell.Header>
  );
}
