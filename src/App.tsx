import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import MapPage from "./features/map/map.page.tsx";
import { RouteApp } from "./pages/constants/route.enum.ts";
import { AnimatePresence } from "framer-motion";
import WelcomePage from "./pages/welcome.page.tsx";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          key={RouteApp.Home}
          path={RouteApp.Home}
          element={<WelcomePage />}
        />
        <Route key={RouteApp.Map} path={RouteApp.Map} element={<MapPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
