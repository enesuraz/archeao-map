import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import Protectoute from "./pages/Protectoute";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import SpinnerPages from "./pages/SpinnerPages";

import MapCities from "./components/MapCities";
import MapCountries from "./components/MapCountries";
import MapForm from "./components/MapForm";
import MapCityDetails from "./components/MapCityDetails";

function App() {
  return (
    <AuthContextProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerPages />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="app"
                element={
                  <Protectoute>
                    <MapPage />
                  </Protectoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<MapCities />} />
                <Route path="cities/:id" element={<MapCityDetails />} />
                <Route path="countries" element={<MapCountries />} />
                <Route path="form" element={<MapForm />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthContextProvider>
  );
}

export default App;
