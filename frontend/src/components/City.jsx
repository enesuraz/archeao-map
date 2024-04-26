import { useCities } from "../contexts/CitiesContext";
import styles from "./City.module.css";
import { Link } from "react-router-dom";
import Message from "./Message";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City({ city }) {
  const { currentCity, deleteCity, isLoading, error } = useCities();
  const { siteName, id, emoji, date, position } = city;

  async function handleDelete(e) {
    e.preventDefault();
    await deleteCity(id);
  }

  if (error) return <Message message={error} />;

  return (
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={`${styles.city} ${
        id === currentCity.id ? styles["city--active"] : ""
      }`}
    >
      <h3 className={styles["city-name"]}>
        <span>{emoji}</span> {siteName}
      </h3>
      <span className={styles["city-date"]}>{formatDate(date)}</span>
      <button
        className={styles["btn--delete"]}
        disabled={isLoading}
        onClick={handleDelete}
      >
        &times;
      </button>
    </Link>
  );
}
export default City;
