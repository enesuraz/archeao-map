import styles from "./MapForm.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "../components/Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function MapForm() {
  const navigate = useNavigate();

  const [siteName, setSiteName] = useState("hello");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [country, setCountry] = useState("");

  const [loadingGeocoding, setLoadingGeocoding] = useState(false);
  const [errorGeocoding, setErrorGeocoding] = useState("");

  const { createCity, isLoading, error } = useCities();

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (!lat && !lng) return;
    async function getCityData() {
      try {
        setLoadingGeocoding(true);
        setErrorGeocoding("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        setSiteName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorGeocoding(err.message);
      } finally {
        setLoadingGeocoding(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      siteName,
      country,
      emoji,
      notes,
      date,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (loadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (errorGeocoding) return <Message message={errorGeocoding} />;

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="city">City Name</label>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        {emoji && <span className={styles["city-flag"]}>{emoji}</span>}
      </div>
      <div className={styles["map-form-date"]}>
        <label htmlFor="city">Date</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div>
        <label htmlFor="city">Notes</label>
        <textarea
          cols="30"
          rows="10"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <div className={styles["map-form-buttons"]}>
        <Button type="btn--filled">Add</Button>
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
    </form>
  );
}
export default MapForm;
