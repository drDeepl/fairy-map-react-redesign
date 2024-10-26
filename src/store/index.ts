import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import mapReducer from "../features/map/mapSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    map: mapReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export default store;
