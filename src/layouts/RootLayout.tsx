import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";
import AppHeader from "../components/AppHeader/AppHeader";
import { SettingsProvider } from "../context/SettingsContext";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <AppShell header={{ height: 56 }}>
        <AppHeader />
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </SettingsProvider>
  );
}
