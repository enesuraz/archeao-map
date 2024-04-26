import styles from "./Country.module.css";

function Country({ country }) {
  return (
    <div className={styles.country}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </div>
  );
}

export default Country;
