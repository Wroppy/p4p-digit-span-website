import { Anchor, AppShell, Group, Title } from "@mantine/core";
import { Link } from "react-router";

export default function AppHeader() {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Title order={4}>Assessment</Title>
        <Group gap="md">
          <Anchor component={Link} to="/">
            Home
          </Anchor>
          <Anchor component={Link} to="/settings">
            Settings
          </Anchor>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
