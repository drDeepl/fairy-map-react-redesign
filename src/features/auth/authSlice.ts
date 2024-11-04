import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./auth.actions";
import { ApiErrorResponse } from "@/api/helpers/handler-response";

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface AuthState {
  loading: boolean;
  error: ApiErrorResponse | null;
  success: boolean;
  user: null | JwtPayload;
  verifyedCaptcha: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  user: null,
  verifyedCaptcha: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setVerifyedCaptcha(state: AuthState, action) {
      state.verifyedCaptcha = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const accessToken: string = action.payload.accessToken;
        const arrayToken = accessToken.split(".");
        const tokenPayload = JSON.parse(atob(arrayToken[1])) as JwtPayload;
        console.log(`token payload ${tokenPayload}`);
        state.user = tokenPayload;
        state.loading = false;
        state.success = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.payload as ApiErrorResponse;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const accessToken: string = action.payload.accessToken;
        const arrayToken = accessToken.split(".");
        const tokenPayload = JSON.parse(atob(arrayToken[1])) as JwtPayload;
        console.log(`token payload ${tokenPayload}`);
        state.user = tokenPayload;
        state.loading = false;
        state.success = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      });
  },
});

export const { setVerifyedCaptcha } = authSlice.actions;

export default authSlice.reducer;
