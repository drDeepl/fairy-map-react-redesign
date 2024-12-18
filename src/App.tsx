import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MapPage from "./features/map/map.page.tsx";
import { RouteApp } from "./pages/constants/route.enum.ts";
import { AnimatePresence } from "framer-motion";
import WelcomePage from "./pages/welcome.page.tsx";
import ErrorMessageScreen from "./pages/error-message.page.tsx";
import AdminPage from "./features/admin/admin.page.tsx";
import UserPage from "./features/user/user.page.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store.ts";
import { useEffect } from "react";
import { checkValidAccessTokenInLocalStorage } from "./common/helpers/token.helper.ts";
import { setUser } from "./features/auth/auth.slice.ts";

export interface LocationParams {
  pathname: string;
  state: null;
  search: string;
  hash: string;
  key: string;
}

function App() {
  const location: LocationParams = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = checkValidAccessTokenInLocalStorage();
    if (currentUser) {
      dispatch(setUser(currentUser));
    }
    navigate(location.pathname);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path={RouteApp.HomePage} element={<WelcomePage />} />
        <Route path={RouteApp.MapPage} element={<MapPage />} />
        <Route path={RouteApp.AdminPage} element={<AdminPage />} />
        <Route path={RouteApp.UserPage} element={<UserPage />} />
        <Route
          path="*"
          element={<ErrorMessageScreen message="Страница не найдена" />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
