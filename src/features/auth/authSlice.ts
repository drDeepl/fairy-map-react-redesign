import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./auth.actions";
import { ApiErrorResponse } from "@/api/helpers/handler-response";
import {
  parsePayloadFromAccessToken,
  setTokenLocalStorage,
} from "@/common/helpers/token.helper";

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  loading: boolean;
  error: ApiErrorResponse | null;
  success: boolean;
  user: null | JwtPayload;
  verifyedCaptcha: boolean;
  dataFormValid: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  user: null,
  verifyedCaptcha: false,
  dataFormValid: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action) {
      state.user = action.payload;
    },
    setVerifyedCaptcha(state: AuthState, action) {
      state.verifyedCaptcha = action.payload;
    },
    setValidDataForm(state: AuthState, action) {
      state.dataFormValid = action.payload;
    },
    setLoad(state: AuthState, action) {
      state.loading = action.payload;
    },
    setError(state: AuthState, action) {
      state.error = action.payload;
    },
    setSuccess(state: AuthState, action) {
      state.success = action.payload;
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
        setTokenLocalStorage(accessToken);
        const user: JwtPayload = parsePayloadFromAccessToken(accessToken);
        console.log(`token payload ${user}`);
        state.user = user;
        state.loading = false;
        state.success = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as ApiErrorResponse;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const accessToken: string = action.payload.accessToken;
        setTokenLocalStorage(accessToken);
        const user: JwtPayload = parsePayloadFromAccessToken(accessToken);
        console.log(`token payload ${user}`);
        state.user = user;
        state.loading = false;
        state.success = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      });
  },
});

export const {
  setUser,
  setVerifyedCaptcha,
  setValidDataForm,
  setLoad,
  setError,
  setSuccess,
} = authSlice.actions;

export default authSlice.reducer;
