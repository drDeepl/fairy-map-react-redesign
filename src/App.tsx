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
import { useEffect, useState } from "react";
import { checkValidAccessTokenInLocalStorage } from "./common/helpers/token.helper.ts";
import { setUser } from "./features/auth/auth.slice.ts";
import AudioProvider from "./features/audio-book/components/audio.provider.tsx";
import StickyBottomNavigation from "./components/navbar-menu/navbar.component.tsx.tsx";
export interface LocationParams {
  pathname: string;
  state: null;
  search: string;
  hash: string;
  key: string;
}

interface ScreenSizeState {
  width: number;
  height: number;
}

function App() {
  const location: LocationParams = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [screenSize, setScreenSize] = useState<ScreenSizeState>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    const currentUser = checkValidAccessTokenInLocalStorage();
    if (currentUser) {
      dispatch(setUser(currentUser));
    }
    navigate(location.pathname);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path={RouteApp.HomePage} element={<WelcomePage />} />
        <Route
          path={RouteApp.MapPage}
          element={
            <AudioProvider>
              <MapPage width={screenSize.width} height={screenSize.height} />
            </AudioProvider>
          }
        />
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
