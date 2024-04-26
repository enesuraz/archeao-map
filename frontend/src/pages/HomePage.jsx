import Button from "../components/Button";
import Header from "../components/Header";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.hero}>
        <div className={styles["hero-details"]}>
          <h1 className="primary-title mb-small">
            Explore the Mysteries of the Past with ArchaeoMap
          </h1>
          <p className="paragraph mb-large">
            Embark on a journey through time as you uncover the secrets of
            ancient civilizations. With ArchaeoMap, delve into the rich history
            of archaeological sites around the world
          </p>
          <Button type="btn--filled" onClick={() => navigate("app")}>
            Explore
          </Button>
        </div>
        <img src="hero.jpg" alt="Hero" className={styles["hero-image"]} />
      </div>
    </>
  );
}

export default HomePage;
