import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles["spinner-container"]}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default Spinner;
