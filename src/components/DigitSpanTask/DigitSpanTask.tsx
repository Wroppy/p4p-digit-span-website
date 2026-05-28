import { useEffect, useState } from "react";
import PresentingPhase from "./PresentingPhase";
import ReadyPhase from "./ReadyPhase";
import RecallPhase from "./RecallPhase";
import ResultPhase from "./ResultPhase";

export type DigitSpanResult = {
  sequence: number[];
  response: number[];
  correct: boolean;
};

type DigitSpanTaskProps = {
  span: number;
  onComplete: (result: DigitSpanResult) => void;
};

type Phase = "ready" | "presenting" | "recall" | "result";

const DIGIT_DURATION = 1600;
const BLANK_DURATION = 400;

function generateSequence(span: number): number[] {
  return Array.from({ length: span }, () => Math.floor(Math.random() * 10));
}

export default function DigitSpanTask({ span, onComplete }: DigitSpanTaskProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showing, setShowing] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [response, setResponse] = useState<number[]>([]);
  const [correct, setCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (phase !== "presenting") return;

    let id: ReturnType<typeof setTimeout>;

    if (showing) {
      id = setTimeout(() => setShowing(false), DIGIT_DURATION);
    } else if (currentIndex < sequence.length - 1) {
      id = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setShowing(true);
      }, BLANK_DURATION);
    } else {
      id = setTimeout(() => setPhase("recall"), BLANK_DURATION);
    }

    return () => clearTimeout(id);
  }, [phase, showing, currentIndex, sequence.length]);

  function handleStart() {
    const seq = generateSequence(span);
    setSequence(seq);
    setCurrentIndex(0);
    setShowing(true);
    setPinValue("");
    setResponse([]);
    setCorrect(null);
    setPhase("presenting");
  }

  function handleSubmit(pin = pinValue) {
    const parsed = pin.split("").map(Number);
    const isCorrect =
      parsed.length === sequence.length && parsed.every((d, i) => d === sequence[i]);
    setResponse(parsed);
    setCorrect(isCorrect);
    setPhase("result");
    onComplete({ sequence, response: parsed, correct: isCorrect });
  }

  function handleReset() {
    setPhase("ready");
    setPinValue("");
    setResponse([]);
    setCorrect(null);
  }

  if (phase === "ready") return <ReadyPhase span={span} onStart={handleStart} />;
  if (phase === "presenting") return <PresentingPhase digit={sequence[currentIndex]} showing={showing} />;
  if (phase === "recall") return <RecallPhase span={span} pinValue={pinValue} onChange={setPinValue} onSubmit={handleSubmit} />;
  return <ResultPhase correct={correct!} sequence={sequence} response={response} onReset={handleReset} />;
}
