import { useLocalStorage } from "@mantine/hooks";
import { createContext, useContext } from "react";

export type DigitSpan = 5 | 9 | 13;

type SettingsContextValue = {
  digitSpan: DigitSpan;
  setDigitSpan: (span: DigitSpan) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [digitSpan, setDigitSpan] = useLocalStorage<DigitSpan>({
    key: "digitSpan",
    defaultValue: 9,
  });

  return (
    <SettingsContext value={{ digitSpan, setDigitSpan }}>
      {children}
    </SettingsContext>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
