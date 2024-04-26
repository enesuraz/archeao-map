import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <ul className={styles["navbar-list"]}>
        <li className={styles["navbar-item"]}>
          <NavLink to="/about" className={styles["navbar-link"]}>
            About
          </NavLink>
        </li>
        <li className={styles["navbar-item"]}>
          <NavLink to="/login" className={`btn ${styles["navbar-link"]}`}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
