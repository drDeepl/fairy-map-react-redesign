import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import store from "./app/store.ts";
import MapPage from "./features/map/map.page.tsx";
import { RouteApp } from "./pages/constants/route.enum.ts";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={RouteApp.Home} element={<App />} />
          <Route path={RouteApp.Map} element={<MapPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
