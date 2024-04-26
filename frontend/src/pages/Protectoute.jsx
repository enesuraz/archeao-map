import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Protectoute({ children }) {
  const navigate = useNavigate();

  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

export default Protectoute;
