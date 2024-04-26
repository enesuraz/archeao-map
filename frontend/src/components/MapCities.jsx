import { useCities } from "../contexts/CitiesContext";
import City from "./City";
import styles from "./MapCities.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function MapCities() {
  const { isLoading, cities, error } = useCities();

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  if (!cities.length) return <Message message="Add your first city :)" />;

  return (
    <div className={styles.cities}>
      {cities.map((city) => (
        <City key={city.id} city={city} />
      ))}
    </div>
  );
}

export default MapCities;
