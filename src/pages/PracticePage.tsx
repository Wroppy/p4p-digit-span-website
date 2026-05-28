import DigitSpanTask, { type DigitSpanResult } from "../components/DigitSpanTask/DigitSpanTask";
import { useSettings } from "../context/SettingsContext";

export default function PracticePage() {
  const { digitSpan } = useSettings();

  function handleComplete(result: DigitSpanResult) {
    console.log("Practice result:", result);
  }

  return <DigitSpanTask span={digitSpan} showFeedback onComplete={handleComplete} />;
}
