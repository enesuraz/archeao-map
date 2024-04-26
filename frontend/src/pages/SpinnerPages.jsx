import Spinner from "../components/Spinner";
import styles from "./SpinnerPages.module.css";

function SpinnerPages() {
  return (
    <div className={styles["spinner-pages"]}>
      <Spinner />
    </div>
  );
}

export default SpinnerPages;
