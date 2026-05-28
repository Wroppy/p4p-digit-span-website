import styles from "./DigitSpanTask.module.css";

type PresentingPhaseProps = {
  digit: number;
  showing: boolean;
};

export default function PresentingPhase({ digit, showing }: PresentingPhaseProps) {
  return (
    <div className={styles.container}>
      {showing ? (
        <div className={styles.digitDisplay}>{digit}</div>
      ) : (
        <div className={styles.blank} />
      )}
    </div>
  );
}
