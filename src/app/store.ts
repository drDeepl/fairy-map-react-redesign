import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import mapReducer from "../features/map/map.slice";
import authReducer from "../features/auth/auth.slice";

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
