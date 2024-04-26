import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import MapPageNav from "./MapPageNav";
import styles from "./MapPageSide.module.css";

function MapPageSide() {
  return (
    <div className={styles["map-page-container"]}>
      <div className={styles["map-page-logo"]}>
        <Logo />
      </div>
      <MapPageNav />
      <Outlet />
    </div>
  );
}
export default MapPageSide;
