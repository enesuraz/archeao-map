import styles from "./AboutPage.module.css";
import Header from "../components/Header";

function AboutPage() {
  return (
    <>
      <Header />
      <div className={styles.about}>
        <div className={styles["about-details"]}>
          <h2 className="primary-title mb-small">About Us</h2>
          <p className="paragraph">
            ArchaeoMap is a passion project born from our love for history and
            exploration. Our mission is to bring the wonders of archaeology to
            your fingertips, making ancient sites accessible and engaging for
            everyone. Whether you are a seasoned historian or a curious
            enthusiast, ArchaeoMap invites you to immerse yourself in the
            stories of the past. From the towering pyramids of Egypt to the
            enigmatic ruins of Machu Picchu, our platform offers a gateway to a
            world of discovery
          </p>
        </div>
        <div className={styles["about-image-box"]}>
          <img src="about.jpg" alt="About" className={styles["about-image"]} />
        </div>
      </div>
    </>
  );
}
export default AboutPage;
