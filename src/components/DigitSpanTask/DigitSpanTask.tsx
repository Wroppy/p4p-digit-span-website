import { type ReactNode, useEffect, useRef, useState } from "react";
import dayjs from "../../lib/dayjs";
import type { DigitEvent } from "../../lib/session";
import PresentingPhase from "./PresentingPhase";
import ReadyPhase from "./ReadyPhase";
import RecallPhase from "./RecallPhase";
import ResultPhase from "./ResultPhase";

export type DigitSpanResult = {
  span: number;
  sequence: number[];
  digits: DigitEvent[];
  startedAt: string;
  response: number[];
  submittedAt: string;
  correct: boolean;
};

type DigitSpanTaskProps = {
  span: number;
  showFeedback: boolean;
  onComplete: (result: DigitSpanResult) => void;
  progress?: ReactNode;
  revealSpan?: boolean;
};

type Phase = "ready" | "presenting" | "recall" | "result" | "done";

const DIGIT_DURATION = 1600;
const BLANK_DURATION = 400;

function generateSequence(span: number): number[] {
  return Array.from({ length: span }, () => Math.floor(Math.random() * 10));
}

export default function DigitSpanTask({ span, showFeedback, onComplete, progress, revealSpan = true }: DigitSpanTaskProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showing, setShowing] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [response, setResponse] = useState<number[]>([]);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const digitsRef = useRef<DigitEvent[]>([]);
  const startedAtRef = useRef("");

  useEffect(() => {
    if (phase !== "presenting") return;

    let id: ReturnType<typeof setTimeout>;

    if (showing) {
      id = setTimeout(() => setShowing(false), DIGIT_DURATION);
    } else if (currentIndex < sequence.length - 1) {
      id = setTimeout(() => {
        const next = currentIndex + 1;
        digitsRef.current.push({ value: sequence[next], shownAt: dayjs().toISOString() });
        setCurrentIndex(next);
        setShowing(true);
      }, BLANK_DURATION);
    } else {
      id = setTimeout(() => setPhase("recall"), BLANK_DURATION);
    }

    return () => clearTimeout(id);
  }, [phase, showing, currentIndex, sequence.length]);

  function handleStart() {
    const seq = generateSequence(span);
    const now = dayjs().toISOString();
    startedAtRef.current = now;
    digitsRef.current = [{ value: seq[0], shownAt: now }];
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
    setPhase(showFeedback ? "result" : "done");
    onComplete({
      span,
      sequence,
      digits: digitsRef.current,
      startedAt: startedAtRef.current,
      response: parsed,
      submittedAt: dayjs().toISOString(),
      correct: isCorrect,
    });
  }

  function handleReset() {
    setPhase("ready");
    setPinValue("");
    setResponse([]);
    setCorrect(null);
  }

  if (phase === "ready") return <ReadyPhase span={span} onStart={handleStart} progress={progress} revealSpan={revealSpan} />;
  if (phase === "presenting") return <PresentingPhase digit={sequence[currentIndex]} showing={showing} />;
  if (phase === "recall") {
    return (
      <RecallPhase
        span={span}
        pinValue={pinValue}
        onChange={setPinValue}
        onSubmit={handleSubmit}
        progress={progress}
      />
    );
  }
  if (phase === "done") return <PresentingPhase digit={0} showing={false} />;
  return <ResultPhase correct={correct!} sequence={sequence} response={response} onReset={handleReset} />;
}
