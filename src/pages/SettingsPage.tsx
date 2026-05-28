import { Button, Container, SegmentedControl, Stack, Text, Title } from "@mantine/core";
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
    <Container size="sm" className={styles.container}>
      <Stack gap="lg">
        <Title>Settings</Title>
        <Stack gap="xs">
          <Text className={styles.label}>Digit span length</Text>
          <Text className={styles.hint}>
            The number of digits participants must recall in each trial.
          </Text>
          <SegmentedControl
            data={SPAN_OPTIONS}
            value={selected}
            onChange={setSelected}
          />
        </Stack>
        <Button onClick={handleSave}>Save</Button>
      </Stack>
    </Container>
  );
}
