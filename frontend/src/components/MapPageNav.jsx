import styles from "./MapPageNav.module.css";
import { NavLink } from "react-router-dom";

function MapPageNav() {
  return (
    <nav className={styles["map-page-nav"]}>
      <NavLink to="cities" className={styles["map-page-link"]}>
        Cities
      </NavLink>
      <NavLink to="countries" className={styles["map-page-link"]}>
        Countries
      </NavLink>
    </nav>
  );
}

export default MapPageNav;
