import { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from "./LoginPage.module.css";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("Nebukednezar@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  const { login, isAuth } = useAuth();
  console.log(isAuth);

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuth) navigate("/app", { replace: true });
  }, [isAuth, navigate]);

  return (
    <>
      <Header />
      <div className={styles["form-container"]}>
        <form className="form" onSubmit={handleSubmit}>
          <h2 className={styles["form-title"]}>Login now</h2>
          <input
            type="email"
            placeholder="Type full name"
            className={styles["form-input"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Type your password"
            className={styles["form-input"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-medium">
            <Button type="filled">Login</Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default LoginPage;
