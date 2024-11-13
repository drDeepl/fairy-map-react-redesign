import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isLoad: boolean;
}

const initialState: AppState = {
  isLoad: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state: AppState, action: PayloadAction<boolean>) {
      state.isLoad = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
