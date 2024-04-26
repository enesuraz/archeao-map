import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/get":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/get":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/create":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };

    case "city/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "reject":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action");
  }
}

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`/cities`);
        const data = await res.json();
        dispatch({ type: "cities/get", payload: data });
      } catch (err) {
        dispatch({
          type: "reject",
          payload: "Error occured when getting cities",
        });
      }
    }
    getData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/get", payload: data });
      } catch (err) {
        dispatch({
          type: "reject",
          payload: "Error occured when getting city",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({ type: "city/create", payload: data });
    } catch (err) {
      dispatch({ type: "reject", payload: "Error occured when creating city" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch (err) {
      dispatch({ type: "reject", payload: "Error occured when deleting city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context was used outside of the hook");
  return context;
}

export { CitiesProvider, useCities };
