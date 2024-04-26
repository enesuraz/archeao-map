import { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
  isAuth: false,
};

const FAKE_USER = {
  name: "Nabukednezar",
  email: "Nebukednezar@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return { isAuth: true, user: action.payload };
    case "user/logout":
      return { isAuth: false, user: null };
    default:
      throw new Error("Unkown action");
  }
}
const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "user/login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "user/logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context was used outside of the provider");
  return context;
}

export { AuthContextProvider, useAuth };
