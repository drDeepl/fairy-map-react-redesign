import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import mapReducer from "../features/map/mapSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export default store;
