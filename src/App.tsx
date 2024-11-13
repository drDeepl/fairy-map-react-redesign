import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import MapPage from "./features/map/map.page.tsx";
import { RouteApp } from "./pages/constants/route.enum.ts";
import { AnimatePresence } from "framer-motion";
import WelcomePage from "./pages/welcome.page.tsx";
import ErrorMessageScreen from "./pages/error-message.page.tsx";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          key={RouteApp.HomePage}
          path={RouteApp.HomePage}
          element={<WelcomePage />}
        />
        <Route
          key={RouteApp.MapPage}
          path={RouteApp.MapPage}
          element={<MapPage />}
        />
        <Route
          path="*"
          element={<ErrorMessageScreen message="Страница не найдена" />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
