import { randomId } from "@mantine/hooks";
import type { TlxValues } from "../components/TlxForm/TlxForm";
import dayjs from "./dayjs";

export const SPANS = [5, 9, 13] as const;

export type DigitEvent = { value: number; shownAt: string };

export type TrialRecord = {
  index: number;
  span: number;
  sequence: number[];
  digits: DigitEvent[];
  startedAt: string;
  response: number[];
  submittedAt: string;
  correct: boolean;
};

export type TestSession = {
  uuid: string;
  createdAt: string;
  trialsPerSpan: number;
  plannedSpans: number[];
  trials: TrialRecord[];
  currentTrialIndex: number;
  tlx: TlxValues | null;
  completedAt: string | null;
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createSession(trialsPerSpan: number): TestSession {
  const plannedSpans = shuffle(
    SPANS.flatMap((span) => Array.from({ length: trialsPerSpan }, () => span)),
  );

  return {
    uuid: randomId(),
    createdAt: dayjs().toISOString(),
    trialsPerSpan,
    plannedSpans,
    trials: [],
    currentTrialIndex: 0,
    tlx: null,
    completedAt: null,
  };
}
