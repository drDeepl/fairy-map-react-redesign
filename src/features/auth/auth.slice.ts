import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signIn, signUp } from "./auth.actions";
import { ApiErrorResponse } from "@/api/helpers/handler-response";
import {
  parsePayloadFromAccessToken,
  setTokenLocalStorage,
  removeTokenLocalStorage,
} from "@/common/helpers/token.helper";
import { BaseAppState } from "@/common/interfaces/state.interface";
import { Components } from "@/api/schemas/client";

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  firstName: string;
  lastName: string;
}

export interface AuthState extends BaseAppState {
  user: null | JwtPayload;
  dataFormValid: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: undefined,
  success: false,
  user: null,
  dataFormValid: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<JwtPayload>) => {
      state.user = action.payload;
    },

    setValidDataForm: (state: AuthState, action: PayloadAction<boolean>) => {
      state.dataFormValid = action.payload;
    },
    setLoad: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (
      state: AuthState,
      action: PayloadAction<ApiErrorResponse | null>
    ) => {
      state.error = action.payload as any;
    },
    setSuccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    userLogOut: (state: AuthState) => {
      state.user = null;
      removeTokenLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(
        signIn.fulfilled,
        (
          state,
          action: PayloadAction<Components.Schemas.TokensResponseDto>
        ) => {
          const accessToken: string = action.payload.accessToken;
          setTokenLocalStorage(accessToken);
          const user: JwtPayload = parsePayloadFromAccessToken(accessToken);

          state.user = user;
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as any;
        } else {
          state.error = undefined;
        }
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(
        signUp.fulfilled,
        (
          state,
          action: PayloadAction<Components.Schemas.TokensResponseDto>
        ) => {
          const accessToken: string = action.payload.accessToken;
          setTokenLocalStorage(accessToken);
          const user: JwtPayload = parsePayloadFromAccessToken(accessToken);
          state.user = user;
          state.loading = false;
          state.success = true;
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiErrorResponse;
      });
  },
});

export const {
  setUser,
  setValidDataForm,
  setLoad,
  setError,
  setSuccess,
  userLogOut,
} = authSlice.actions;

export default authSlice.reducer;
