import { Button, Divider, NumberInput, Paper, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { type DigitSpan, useSettings } from "../context/SettingsContext";
import { SPANS } from "../lib/session";
import styles from "./SettingsPage.module.css";

const SPAN_OPTIONS = [
  { label: "5", value: "5" },
  { label: "9", value: "9" },
  { label: "13", value: "13" },
];

export default function SettingsPage() {
  const { digitSpan, setDigitSpan, trialsPerSpan, setTrialsPerSpan } = useSettings();
  const [selected, setSelected] = useState(String(digitSpan));
  const [trials, setTrials] = useState(trialsPerSpan);
  const navigate = useNavigate();

  function handleSave() {
    setDigitSpan(Number(selected) as DigitSpan);
    setTrialsPerSpan(trials);
    navigate("/");
  }

  return (
    <div className={styles.page}>
      <Paper withBorder shadow="xs" p="xl" radius="md" className={styles.card}>
        <Stack gap="lg">
          <Title order={2}>Settings</Title>
          <Divider />
          <Stack gap="xs">
            <Text fw={500}>Practice digit span</Text>
            <Text className={styles.hint}>
              The number of digits to recall in each practice trial.
            </Text>
            <SegmentedControl
              data={SPAN_OPTIONS}
              value={selected}
              onChange={setSelected}
              fullWidth
            />
          </Stack>
          <Stack gap="xs">
            <Text fw={500}>Tests per span</Text>
            <Text className={styles.hint}>
              How many trials to run at each span ({SPANS.join(", ")}) during a
              test. {trials} per span = {trials * SPANS.length} trials total.
            </Text>
            <NumberInput
              min={1}
              value={trials}
              onChange={(v) => setTrials(typeof v === "number" ? v : 1)}
              allowDecimal={false}
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
