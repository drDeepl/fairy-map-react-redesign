import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import mapReducer from "../features/map/map.slice";
import authReducer from "../features/auth/auth.slice";
import bookReducer from "../features/book/book.slice";
import bookListReducer from "../features/book/list-book.slice";
import ethnicGroupListReducer from "../features/ethnic-group/ethnic-group-list.slice";
import audioBookListReducer from "../features/book/components/audio-book/audio-book-list.slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    map: mapReducer,
    auth: authReducer,
    listBook: bookListReducer,
    ethnicGroupList: ethnicGroupListReducer,
    book: bookReducer,
    audioBookList: audioBookListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
