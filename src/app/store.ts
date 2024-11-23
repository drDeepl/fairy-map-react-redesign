import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import mapReducer from "../features/map/map.slice";
import authReducer from "../features/auth/auth.slice";
import bookReducer from "../features/book/book.slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    map: mapReducer,
    auth: authReducer,
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export default store;
