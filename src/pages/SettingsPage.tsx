import { Button, Divider, Paper, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { type DigitSpan, useSettings } from "../context/SettingsContext";
import styles from "./SettingsPage.module.css";

const SPAN_OPTIONS = [
  { label: "5", value: "5" },
  { label: "9", value: "9" },
  { label: "13", value: "13" },
];

export default function SettingsPage() {
  const { digitSpan, setDigitSpan } = useSettings();
  const [selected, setSelected] = useState(String(digitSpan));
  const navigate = useNavigate();

  function handleSave() {
    setDigitSpan(Number(selected) as DigitSpan);
    navigate("/");
  }

  return (
    <div className={styles.page}>
      <Paper withBorder shadow="xs" p="xl" radius="md" className={styles.card}>
        <Stack gap="lg">
          <Title order={2}>Settings</Title>
          <Divider />
          <Stack gap="xs">
            <Text fw={500}>Digit span length</Text>
            <Text className={styles.hint}>
              The number of digits participants must recall in each trial.
            </Text>
            <SegmentedControl
              data={SPAN_OPTIONS}
              value={selected}
              onChange={setSelected}
              fullWidth
            />
          </Stack>
          <Button onClick={handleSave} fullWidth>
            Save
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
