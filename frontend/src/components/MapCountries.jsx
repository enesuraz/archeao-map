import { useCities } from "../contexts/CitiesContext";
import Country from "./Country";
import styles from "./MapCountries.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function MapCountries() {
  const { isLoading, cities, error } = useCities();

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  if (!cities.length) return <Message message="Add your first city :)" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <div className={styles.countries}>
      {countries.map((country) => (
        <Country country={country} key={country.country} />
      ))}
    </div>
  );
}

export default MapCountries;
