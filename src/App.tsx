import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import MapPage from "./features/map/map.page.tsx";
import { RouteApp } from "./pages/constants/route.enum.ts";
import { AnimatePresence } from "framer-motion";
import WelcomePage from "./pages/welcome.page.tsx";
import ErrorMessageScreen from "./pages/error-message.page.tsx";
import AdminPage from "./features/admin/admin.page.tsx";
import { useEffect } from "react";
import { JwtPayload, setUser } from "./features/auth/auth.slice.ts";
import { checkValidAccessTokenInLocalStorage } from "./common/helpers/token.helper.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store.ts";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const user: JwtPayload | null = checkValidAccessTokenInLocalStorage();

    if (user) {
      dispatch(setUser(user));
    }
  }, []);

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
          key={RouteApp.AdminPage}
          path={RouteApp.AdminPage}
          element={<AdminPage />}
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
