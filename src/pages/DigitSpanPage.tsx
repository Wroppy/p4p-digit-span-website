import DigitSpanTask, { type DigitSpanResult } from "../components/DigitSpanTask/DigitSpanTask";
import { useSettings } from "../context/SettingsContext";

export default function DigitSpanPage() {
  const { digitSpan } = useSettings();

  function handleComplete(result: DigitSpanResult) {
    console.log("Digit span result:", result);
  }

  return <DigitSpanTask span={digitSpan} onComplete={handleComplete} />;
}
