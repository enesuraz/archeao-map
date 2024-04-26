import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import styles from "./MapCityDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function MapCityDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentCity, getCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  const { siteName, date, emoji, notes } = currentCity;

  return (
    <div className={styles["city-details"]}>
      <div className={styles["city-name"]}>
        <span>{emoji}</span> <span>{siteName}</span>
      </div>
      <div className={styles["city-date"]}>
        <span>{date}</span>
      </div>
      <div>
        <p>{notes}</p>
      </div>
      <div>
        <a
          href={`https://en.wikipedia.org/wiki/${siteName}`}
          target="_blank"
          className={styles["city-button"]}
        >
          Learn More
        </a>
      </div>
      <div className="back-btn">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="btn--outlined"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default MapCityDetails;
