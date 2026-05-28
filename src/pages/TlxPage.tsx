import TlxForm, { type TlxValues } from "../components/TlxForm/TlxForm";
import styles from "./TlxPage.module.css";

export default function TlxPage() {
  function handleSubmit(values: TlxValues) {
    console.log("NASA TLX results:", values);
  }

  return (
    <div className={styles.page}>
      <TlxForm onSubmit={handleSubmit} />
    </div>
  );
}
