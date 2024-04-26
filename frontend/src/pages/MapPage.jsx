import styles from "./MapPage.module.css";
import MapPageSide from "../components/MapPageSide";
import Map from "../components/Map";
import User from "../components/User";

function MapPage() {
  return (
    <div className={styles["map-page"]}>
      <MapPageSide />
      <Map />
      <User />
    </div>
  );
}

export default MapPage;
