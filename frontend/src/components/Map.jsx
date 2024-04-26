import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";

import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [inputLatitude, setInputLatitude] = useState("");
  const [inputLongitude, setInputLongitude] = useState("");

  const {
    isLoading: geoLocationIsLoading,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  function handleFormMapSubmit(e) {
    e.preventDefault();
    if (
      ![inputLatitude, inputLongitude].every((inp) => inp !== 0) ||
      ![inputLatitude, inputLongitude].every((inp) => inp > 0)
    )
      return;
    setMapPosition([+inputLatitude, +inputLongitude]);
    setInputLatitude("");
    setInputLongitude("");
  }

  return (
    <div className={styles["map-page-map"]}>
      {!geoLocationPosition && (
        <Button type="btn--map" onClick={getPosition}>
          {geoLocationIsLoading ? "...loading" : "Use Your position"}
        </Button>
      )}
      <form className={styles["form-map"]} onSubmit={handleFormMapSubmit}>
        <input
          type="text"
          placeholder="Type latitude"
          value={inputLatitude}
          onChange={(e) => setInputLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type longitude"
          value={inputLongitude}
          onChange={(e) => setInputLongitude(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }}>
          Ok
        </button>
      </form>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.siteName}</span>
            </Popup>
          </Marker>
        ))}
        <ChnagePosition position={mapPosition} />
        <ClickMap />
      </MapContainer>
    </div>
  );
}

function ChnagePosition({ position }) {
  const view = useMap();
  view.setView(position);
  return null;
}

function ClickMap() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
